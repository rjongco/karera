require("dotenv").config(); // Load dotenv
import {
  successResponse,
  errorResponse,
  executeVerifierActions,
  makeLog,
  findChangedValues,
  createOrUpdateUserGroup,
  generateReferralCode,
  makeNotif,
  numWithS,
  generateAccountId,
  mobilePH,
  getNickname,
} from "../utils/logic";
import { canViewTableUM } from "../utils/permissions/userManagement";
import User from "../models/User";
import Address from "../models/Address";
import Province from "../models/Province";
import City from "../models/City";
import Barangay from "../models/Barangay";
import { Sequelize } from "sequelize";
import { Op, FindOptions } from "sequelize";
import fs from "fs";
import path from "path";
import { pipeline, Readable } from "stream";
import { promisify } from "util";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import UserGroup from "../models/UserGroup";
import Wallet from "../models/Wallet";
import Notification from "../models/Notification";
import Transaction from "../models/Transaction";
import Session from "../models/Session";
import stasherAPI from "../api/stasher";
import config from "../config/config";
import { DEVELOPMENT, GCASH } from "../constants";
import Cards from "../models/Cards";
dayjs.extend(utc);
import argon2 from 'argon2';

const environment = process.env.NODE_ENV || "development";
const FRONTEND_URL = config[environment].frontend_url;

const storage = `${environment === DEVELOPMENT ? "./dist/server" : "."}`;

const { ROLES } = require("../constants/permission");
const models = { User, Address, Province, City, Barangay };
// Load associations
// @ts-ignore
User.associate && User.associate(models);
// @ts-ignore
Address.associate && Address.associate(models);
// @ts-ignore
Province.associate && Province.associate(models);
// @ts-ignore
City.associate && City.associate(models);
// @ts-ignore
Barangay.associate && Barangay.associate(models);

const pump = promisify(pipeline);

// Define the type for your filters object
type Filters = {
  keywords?: string; // Include 'keywords' property as optional
  // Add other properties as needed
};
interface UserModelAttributes {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  role: string;
  mobile: string;
  // Include other attributes, including "updatedAt"
  updatedAt: Date; // Assuming updatedAt is of type Date
  createdAt: Date; // Assuming createdAt is of type Date
}

type UserAttributes = keyof UserModelAttributes;

const getAllUsers = async (request, reply) => {
  const userRole = request.userRole;
  const uuid = request.user.uuid;
  let filterAddress = false;

  const { page, size, sort, filter, status } = request.query;

  const [columnName, direction] = sort.split(",");
  const order = [[columnName, direction.toUpperCase()]] as [
    UserAttributes,
    string
  ][];

  let whereConditions = {} as any; // Define whereConditions as any type
  const whereConditionsProvincePerma = {} as any; // Define whereConditions as any type
  const whereConditionsProvinceCur = {} as any; // Define whereConditions as any type

  // if (status === "inactive") {
  //   whereConditions.deletedAt = { [Op.not]: null };
  // } else {
  //   whereConditions.deletedAt = null;
  // }
         


  whereConditions[Op.and] = [
    {
      uuid: {
        [Op.ne]: uuid, // Op.ne means "not equal"
      },
      role: { [Op.notIn]: canViewTableUM(userRole) },
    },
  ];

  if (userRole === ROLES.SUPERVISOR.name || userRole === ROLES.VERIFIER.name) {
    whereConditions.isKYC = 1;
  }

    let provinceId = "";
    let cityId = "";
    let barangayId = "";
    let usePresent = "";

  if (filter) {
    // Split the filter string by '&' to get individual filter conditions
    const filterConditions = filter.split("&");

    filterConditions.forEach((condition) => {
      const [columnFilter, valueFilter] = condition.split("=");
      const decodedValue = decodeURIComponent(valueFilter);

      // return successResponse(
      //   {columnFilter, decodedValue},
      //   "test",
      //   reply
      // );

      if (columnFilter === "uuid") {
        const uuidConditions = {
          uuid: { [Op.substring]: decodedValue },
        };
        whereConditions[Op.or] = uuidConditions;
      } else if (columnFilter === "role") {
        const formattedRole = decodedValue.toLowerCase().replace(/\s/g, "");
        whereConditions[columnFilter] = {
          [Op.like]: `%${formattedRole}%`,
        };
      } else if (columnFilter === "status") {
        const status = JSON.parse(decodedValue);
       
        
        if (status === "deactivated") {
          whereConditions.deletedAt = { [Op.not]: null };
          whereConditions.status = "deactivated";
        //   // whereConditions[Op.or] = { deletedAt:{ [Op.not]: null } };
        //   whereConditions.deletedAt = { [Op.not]: null };
        } else if(status === "active") {
          whereConditions.deletedAt = null;
          whereConditions.status = "active";
        //   whereConditions[Op.or] = { deletedAt:null };
        } else if(status === "all"){
          whereConditions = {};
        }      
     
      } else if (columnFilter === "name") {
        whereConditions[Op.or] = [
          Sequelize.literal(
            `CONCAT(firstName, ' ', lastName) LIKE '%${decodedValue}%'`
          ),
        ];
      }else if (columnFilter === "birthdate") {
        // Assuming birthdate filter is in format YYYY-MM-DD
        const startBirthdate = `${decodedValue} 00:00:00`;
        const endBirthdate = `${decodedValue} 23:59:59`;
        whereConditions["birthdate"] = {
          [Op.between]: [startBirthdate, endBirthdate],
        };
      }else if (columnFilter === "address") {
        const jsonParse = JSON.parse(decodedValue);
         const { province, city, barangay } = jsonParse
         provinceId = province?.id || "";
         cityId = city?.id || "";
         barangayId = barangay?.id || "";
         filterAddress = true
      } else if (columnFilter === "usePresentAddress"){
          const isPresent = JSON.parse(decodedValue);
          usePresent = isPresent
      } else if (columnFilter === "verifier") {
        whereConditions[Op.or] = [
          Sequelize.literal(
            `(SELECT CONCAT(firstName, ' ', lastName) FROM users AS Verifier WHERE Verifier.uuid = User.personWhoDeactivated) LIKE '%${decodedValue}%' OR 
            (SELECT CONCAT(firstName, ' ', lastName) FROM users AS Verifier WHERE Verifier.uuid = User.verifierWhoApprove) LIKE '%${decodedValue}%'`
          ),
        ];
      } else if (columnFilter === "supervisor") {
        whereConditions[Op.or] = [
          Sequelize.literal(
            `(SELECT CONCAT(firstName, ' ', lastName) FROM users AS SUPERVISOR WHERE SUPERVISOR.uuid = User.supervisorWhoApprove) LIKE '%${decodedValue}%' OR 
            (SELECT CONCAT(firstName, ' ', lastName) FROM users AS SUPERVISOR WHERE SUPERVISOR.uuid = User.personWhoDenied) LIKE '%${decodedValue}%' OR 
            (SELECT CONCAT(firstName, ' ', lastName) FROM users AS SUPERVISOR WHERE SUPERVISOR.uuid = User.personWhoDeactivated) LIKE '%${decodedValue}%'`
          ),
        ];
      } else if (columnFilter === "supervisorApprovedAt") {
      } else if (columnFilter === "verifierApprovedAt") {
      } else if (columnFilter === "createdAt") {
          const [startDateTime, endDateTime] = decodedValue.split(",");
          whereConditions["createdAt"] = {
            [Op.between]: [startDateTime, endDateTime],
          };
      } else if (columnFilter === "updatedAt") {
        const [startDateTime, endDateTime] = decodedValue.split(",");
        whereConditions["updatedAt"] = {
          [Op.between]: [startDateTime, endDateTime],
        };
      }

      // } else if (columnFilter === "createdAt") {
      //   const dateConditions = {
      //     createdAt: { [Op.substring]: decodedValue },
      //   };
      //   whereConditions[Op.or] = dateConditions;
      //   whereConditions[Op.or] = dateConditions;
      // } else if (columnFilter === "updatedAt") {
      //   const dateConditions = {
      //     updatedAt: { [Op.substring]: decodedValue },
      //   };
      //   whereConditions[Op.or] = dateConditions;
      // }
      else {
        whereConditions[columnFilter] = { [Op.like]: `%${decodedValue}%` };
        whereConditions.deletedAt = null;
     
      }



      if(provinceId !== ""){
        if(usePresent === "1"){
          whereConditionsProvinceCur[Op.or] = { provinceId };
        }else{
          whereConditionsProvincePerma[Op.or] = { provinceId };
        }
      }
      if(cityId !== ""){
        if(usePresent === "1"){
          whereConditionsProvinceCur[Op.or] = { cityId };
        }else{
          whereConditionsProvincePerma[Op.or] = { cityId };
        }
      }
      if(barangayId !== ""){
        if(usePresent === "1"){
          whereConditionsProvinceCur[Op.or] = { barangayId };
        }else{
          whereConditionsProvincePerma[Op.or] = { barangayId };
        }
      }
    });
  }

  const offset = page * size;
  const options: FindOptions = {
    attributes: [
      "id",
      "uuid",
      [
        Sequelize.fn(
          "CONCAT",
          Sequelize.col("firstName"),
          " ",
          Sequelize.col("lastName")
        ),
        "fullName",
      ],
      "firstName",
      "lastName",
      "nickName",
      "role",
      "email",
      "accountId",
      "birthdate",
      "placeOfBirth",
      "nationalities",
      "natureOfWork",
      "gender",
      "address",
      "profilePicture",
      "mobile",
      "isMobileVerified",
      "actionStatus",
      [
        Sequelize.literal(
          `(SELECT CONCAT(firstName, ' ', lastName) FROM users AS Supervisor WHERE Supervisor.uuid = User.supervisorWhoApprove)`
        ),
        "supervisorWhoApproveName",
      ],
      [
        Sequelize.literal(
          `(SELECT CONCAT(firstName, ' ', lastName) FROM users AS Verifier WHERE Verifier.uuid = User.verifierWhoApprove)`
        ),
        "verifierWhoApproveName",
      ],
      [
        Sequelize.literal(
          `(SELECT CONCAT(firstName, ' ', lastName) FROM users AS Person WHERE Person.uuid = User.personWhoDeactivated)`
        ),
        "personWhoDeactivated",
      ],
      [
        Sequelize.literal(
          `(SELECT CONCAT(firstName, ' ', lastName) FROM users AS Person WHERE Person.uuid = User.personWhoDenied)`
        ),
        "personWhoDeniedName",
      ],
      [
        Sequelize.literal(
          `(SELECT role FROM users AS Person WHERE Person.uuid = User.personWhoDeactivated)`
        ),
        "personWhoDeactiveRole",
      ],
      [
        Sequelize.literal(
          `(SELECT role FROM users AS Person WHERE Person.uuid = User.personWhoDenied)`
        ),
        "personWhoDeniedRole",
      ],
      "isSupervisorApproved",
      "supervisorWhoApprove",
      "verifierApprovedAt",
      "supervisorApprovedAt",
      "isVerifierApproved",
      "isDeactivated",
      "isDenied",
      "actionStatus",
      "deactivatedReason",
      "deniedReason",
      "deactivatedAt",
      "deniedAt",
      "createdAt",
      "updatedAt",
      "commission",
      "govtType",
      "govtId",
      "govtPicture",
      "govtIdPicture",
      "referralLinkForMA",
      "referralLinkForAgent",
      "status",
    ] as UserAttributes[],
    where: whereConditions,
    include: [
      {
        model: UserGroup,
        as: "child",
        attributes: [
          [
            Sequelize.literal(
              `(SELECT CONCAT(firstName, ' ', lastName) FROM users AS Users WHERE Users.id = child.childId)`
            ),
            "fullName",
          ],
          ["childId", "id"],
        ],
      },
      {
        model: UserGroup,
        as: "parent",
      },
      {
        model: Address,
        as: "currentAddress",
        attributes: ["barangayId","cityId","provinceId","street", "zipCode"],
        required: filterAddress, // Include users even if they don't have a current address
        where:whereConditionsProvinceCur,
        include: [
          { model: Province, as: "province", attributes: ["id", "name"] },
          { model: City, as: "city", attributes: ["id", "name"] },
          { model: Barangay, as: "barangay", attributes: ["id", "name"] },
        ],
      },
      {
        model: Address,
        as: "permanentAddress",
        attributes: ["barangayId","cityId","provinceId","street", "zipCode"],
        required: filterAddress, // Include users even if they don't have a current address
        where:whereConditionsProvincePerma,
        include: [
          { model: Province, as: "province", attributes: ["id", "name"] },
          { model: City, as: "city", attributes: ["id", "name"] },
          { model: Barangay, as: "barangay", attributes: ["id", "name"] },
        ],
      },
      {
        model: Wallet,
        attributes: ["balance"],
      },
    ],
    offset,
    limit: size,
  };

  // Now you can safely check if "updatedAt" is a valid attribute
  if (
    columnName === "updatedAt" &&
    ("updatedAt" as keyof UserModelAttributes)
  ) {
    order.push(["updatedAt", direction.toUpperCase()]);
    order.push(["createdAt", direction.toUpperCase()]); // Secondary sort by createdAt
  }

  options.order = order;

  const users = await User.findAll(options);
  const totalCount = await User.count(options);
  const payload = {
    content: users,
    totalCount,
  };

  if (users) {
    return successResponse(
      payload,
      "Get All Users is successfully fetched!",
      reply
    );
  } else {
    return errorResponse("Users not found", reply, "custom");
  }
};

const addUser = async (request, reply) => {
  const userRole = request.userRole;
  const id = request.user.id;
  const { mobile, firstName, lastName, role } = request.body;

  let phoneNumber = mobilePH(mobile);

  // const isApiAvailable = await stasherAPI.checkApiAvailability();

  // if (!isApiAvailable) {
  //   const msgErr = "Authentication Error";
  //   return errorResponse(msgErr, reply, "custom");
  // }

  const payloadStasher = {
    name: `${firstName} ${lastName}`,
    mobileNumber: phoneNumber,
  };
  const payload = {
    mobile,
    username: null,
    firstName,
    lastName,
    email: null,
    role,
  };

  // let payload = {};

  // const base_url = `${FRONTEND_URL}/register`;
  // const referralCode = generateReferralCode();

  // if (role === ROLES.MASTERAGENT.name) {
  //   const link = `${base_url}?ref=M-${referralCode}`;
  //   const code = `M-${referralCode}`;

  //   payload = {
  //     mobile,
  //     username: null,
  //     firstName,
  //     lastName,
  //     email: null,
  //     role,
  //     referralCodeForMA: code,
  //     referralLinkForMA: link,
  //   };
  // } else if (role === ROLES.AGENT.name) {
  //   const link = `${base_url}?ref=A-${referralCode}`;
  //   const code = `A-${referralCode}`;

  //   payload = {
  //     mobile,
  //     username: null,
  //     firstName,
  //     lastName,
  //     email: null,
  //     role,
  //     referralCodeForAgent: code,
  //     referralLinkForAgent: link,
  //   };
  // } else {
  //   payload = {
  //     mobile,
  //     username: null,
  //     firstName,
  //     lastName,
  //     email: null,
  //     role,
  //     referralCodeForAgent: null,
  //     referralLinkForAgent: null,
  //   };
  // }

  await User.create(payload)
    .then(async (user) => {
      const wallet = await Wallet.count({ where: { user_id: user.id } });
      if (wallet === 0) {
        await Wallet.create({
          user_id: user.id,
        });
      }

      const birthdate = dayjs().subtract(21, "day").format("YYYY-MM-DD");

      const nicknameUserId = user.id;
      const nickName = getNickname(
        firstName,
        lastName,
        birthdate,
        mobile,
        nicknameUserId
      );

      await User.update(
        {
          nickName,
          createdBy: id,
        },
        {
          where: { id: user.id },
        }
      );

      // const { id: accountId } = await stasherAPI.createStasherAccount(
      //   request,
      //   payloadStasher
      // );

      await makeLog(
        `A new user has been added. Details ${JSON.stringify(payload)}`,
        "profile",
        "info",
        user.id,
        "user"
      );

      return successResponse({}, "User added successfully!", reply);
    })
    .catch((err) => {
      return errorResponse(err, reply);
    });
};

const updateUser = async (request, reply) => {
  const uuid = request.params.id; // Get user ID from URL params
  const { mobile, firstName, lastName, email, role, userGroups, commission } =
    request.body;

  const user = await User.findOne({
    attributes: [
      "id",
      "mobile",
      "firstName",
      "lastName",
      "email",
      "role",
      "commission",
    ],
    where: { uuid },
  });
  //  @ts-ignore
  const { id, ...rest } = user.toJSON();

  let isMobileVerified = user.isMobileVerified;
  if (mobile !== user.mobile) {
    isMobileVerified = 0;
  }

  const payload = {
    mobile,
    firstName,
    lastName,
    email,
    role,
    commission,
    isMobileVerified,
  };

  const userGroupData = userGroups?.map(async (obj) => {
    const parentId = id;
    const childId = obj.id;
    return createOrUpdateUserGroup(parentId, childId);
  });

  // Execute all the create operations in parallel using Promise.all
  await Promise.all(userGroupData);

  const logs = findChangedValues(payload, rest);
  if (logs.length > 0) {
    await makeLog(
      `The user has been updated. Details ${logs}`,
      "profile",
      "info",
      id,
      "user"
    );
  }

  await User.update(payload, {
    // @ts-ignore
    attributes: [
      "id",
      "mobile",
      "firstName",
      "lastName",
      "email",
      "role",
      "commission",
    ],
    where: { uuid },
    returning: true,
  })
    .then(async () => {
      return successResponse({}, "User updated successfully!", reply);
    })
    .catch((err) => {
      return errorResponse(err, reply);
    });
};

const uploadUserImage = async (request, reply) => {
  const id = request.user.id;
  const uuid = request.params.id;
  const type = request.params.type;
  const parts = request.files();

  const user = await User.findOne({
    attributes: ["profilePicture", "mobile", "govtPicture", "govtIdPicture"],
    where: { uuid },
  });

  if (!user) {
    return errorResponse("User not found", reply, "custom");
  }

  if (type === "user") {
    const { profilePicture, mobile } = user;
    if (profilePicture) {
      // Construct the path to the user's image file
      const imagePath = path.join(
        "dist",
        "server",
        "public",
        "uploads",
        "images",
        "profile-pictures",
        uuid,
        profilePicture
      );

      // Check if the image file exists
      if (fs.existsSync(imagePath)) {
        // Delete the image file
        fs.unlinkSync(imagePath);
      }
    }

    for await (const part of parts) {
      // Check if the part is a file
      if (part.file) {
        const fileExtension = part.filename.split(".").pop();

        if (fileExtension !== "jpg" && fileExtension !== "png") {
          return errorResponse("Accept only image", reply, "custom");
        }

        const uniqueFilename = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 15)}.${fileExtension}`;
        // Generate a custom filename (you can replace this logic with your own)
        // const customFilename = `${uniqueFilename}.${fileExtension}`;

        await pump(
          part.file,
          fs.createWriteStream(
            `${storage}/public/uploads/images/profile-pictures/${uuid}/${uniqueFilename}`
          )
        );
        const payload = { profilePicture: uniqueFilename };
        const logs = findChangedValues({ profilePicture }, payload);

        await makeLog(
          `The user picture of ${mobile} has been uploaded. ${logs}`,
          "profile",
          "info",
          id,
          "user"
        );

        await User.update(payload, { where: { uuid } });

        return successResponse(
          uniqueFilename,
          "User image uploaded successfully!",
          reply
        );
      }
    }
  } else if (type === "govt") {
    const { govtPicture, mobile } = user;

    if (govtPicture) {
      // Construct the path to the user's image file
      const imagePathGovt = path.join(
        "dist",
        "server",
        "public",
        "uploads",
        "images",
        "govt-pictures",
        uuid,
        govtPicture
      );

      // Check if the image file exists
      if (fs.existsSync(imagePathGovt)) {
        // Delete the image file
        fs.unlinkSync(imagePathGovt);
      }
    }

    for await (const part of parts) {
      // Check if the part is a file
      if (part.file) {
        const uniqueFilename = part.filename;
        await pump(
          part.file,
          fs.createWriteStream(
            `${storage}/public/uploads/images/govt-pictures/${uuid}/${uniqueFilename}`
          )
        );
        const payload = { govtPicture: uniqueFilename };
        const logs = findChangedValues(
          { govtPicture: uniqueFilename },
          payload
        );

        await makeLog(
          `The user goverment id of ${mobile} has been uploaded. ${logs}`,
          "profile",
          "info",
          id,
          "user"
        );

        await User.update(payload, { where: { uuid } });

        return successResponse(
          uniqueFilename,
          "User government id uploaded successfully1!",
          reply
        );
      }
    }
  } else if (type === "govtIdPic") {
    const { govtIdPicture, mobile } = user;

    if (govtIdPicture) {
      // Construct the path to the user's image file
      const imagePathGovt = path.join(
        "dist",
        "server",
        "public",
        "uploads",
        "images",
        "govt-pictures",
        uuid,
        govtIdPicture
      );
      // Check if the image file exists
      if (fs.existsSync(imagePathGovt)) {
        // Delete the image file
        fs.unlinkSync(imagePathGovt);
      }
    }

    for await (const part of parts) {
      // Check if the part is a file
      if (part.file) {
        const fileExtension = part.filename.split(".").pop();
        const uniqueFilename = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 15)}.${fileExtension}`;
        // Generate a custom filename (you can replace this logic with your own)
        // const customFilename = `${uniqueFilename}.${fileExtension}`;

        await pump(
          part.file,
          fs.createWriteStream(
            `${storage}/public/uploads/images/govt-pictures/${uuid}/${uniqueFilename}`
          )
        );
        const payload = { govtIdPicture: uniqueFilename };
        const logs = findChangedValues({ govtIdPicture }, payload);

        await makeLog(
          `The user gov't id of ${mobile} has been uploaded. ${logs}`,
          "profile",
          "info",
          id,
          "user"
        );

        await User.update(payload, { where: { uuid } });

        return successResponse(
          uniqueFilename,
          "User Gov't. id is now uploaded successfully!",
          reply
        );
      }
    }
  }

  return successResponse({}, "User image uploaded successfully1!", reply);
};

const deleteUser = async (request, reply) => {
  //   const userId = request.params.id; // Get user ID from URL params
  const { id: uuid } = request.params;
  const user = await User.findOne({
    attributes: ["id", "mobile"],
    where: { uuid },
  });

  if (!user) {
    return errorResponse("User not found", reply, "custom");
  }
  const { id, mobile } = user;
  //   return successResponse(id, "User image uploaded successfully1!", reply);

  await User.update({ status:'deactivated', deletedAt: new Date() }, { where: { uuid } })
    .then(async () => {
      await makeLog(
        `The user of ${mobile} has been deactivated`,
        "user-management",
        "info",
        id,
        "user"
      );
      return successResponse({}, "User deactivated successfully!", reply);
    })
    .catch((err) => {
      return errorResponse(err, reply);
    });
};

const restoreUser = async (request, reply) => {
  //   const userId = request.params.id; // Get user ID from URL params
  const { id: uuid } = request.params;
  const user = await User.findOne({
    attributes: ["id", "mobile"],
    where: { uuid },
  });

  if (!user) {
    return errorResponse("User not found", reply, "custom");
  }
  const { id, mobile } = user;
  //   return successResponse(id, "User image uploaded successfully1!", reply);

  await User.update({ status:'active', deletedAt: null }, { where: { uuid } })
    .then(async () => {
      await makeLog(
        `The user of ${mobile} has been restore`,
        "user-management",
        "info",
        id,
        "user"
      );
      return successResponse({}, "User restore successfully!", reply);
    })
    .catch((err) => {
      return errorResponse(err, reply);
    });
};

const getUserProfile = async (request, reply) => {
  const uuid = request.user.uuid;

  const user = await User.findOne({
    attributes: [
      "uuid",
      "firstName",
      "lastName",
      "nickName",
      "birthdate",
      "gender",
      "role",
      "address",
      "email",
      "profilePicture",
      "mobile",
      "accountId",
      "govtType",
      "govtId",
      "govtPicture",
      "govtIdPicture",
      // added
      "isSupervisorApproved",
      "isVerifierApproved",
      "isDeactivated",
      "isDenied",
      "actionStatus",
      "isKYC",
      "passcode",
    ],
    include: [
      {
        model: Wallet,
        attributes: ["balance"],
      },
    ],
    where: { uuid },
  });

  const totalCount = await Notification.count({
    include: [
      {
        model: User,
        as: "user",
        where: { uuid }, // Filter by userId in the User model
      },
    ],
    where: { isRead: false },
  });

  // Check if user is found
  if (user) {
    const userData = { ...user.toJSON(), notification: { totalCount } };

    return successResponse(
      userData,
      "The User Profile Successfully Fetch!",
      reply
    );
  } else {
    // Handle case where user is not found
    return errorResponse("User not found", reply, "custom");
  }
};

const updateUserProfile = async (request, reply) => {
  const id = request.user.id;
  const uuid = request.user.uuid;
  const oldUser = await User.findOne({
    where: { uuid },
    attributes: ["currentAddressId", "permanentAddressId"],
  });

  const { currentAddressId, permanentAddressId } = oldUser;
  const {
    mobile,
    firstName,
    lastName,
    email,
    gender,
    birthdate,
    placeOfBirth,
    nationalities,
    natureOfWork,
    sourceOfIncome,
    address,
    govtId,
    govtType,
    permanentAddresses,
    currentAddresses,
    usePresentAddress,
  } = request.body;

  const {
    street: perStreet,
    provinceId: perProvinceId,
    cityId: perCityId,
    barangayId: perBarangayId,
    zipCode: perZipCode,
  } = permanentAddresses;
  const {
    street: curStreet,
    provinceId: curProvinceId,
    cityId: curCityId,
    barangayId: curBarangayId,
    zipCode: curZipCode,
  } = currentAddresses;

  const addressPerma = await User.count({
    include: [
      {
        model: Address,
        as: "permanentAddress",
        attributes: [],
        where: { id: permanentAddressId },
      },
    ],
  });
  let permanentAddress: any = null;
  if (addressPerma === 0) {
    permanentAddress = await Address.create({
      street: perStreet,
      provinceId: perProvinceId,
      cityId: perCityId,
      barangayId: perBarangayId,
      zipCode: perZipCode,
    });
  } else {
    permanentAddress = await Address.update(
      {
        street: perStreet,
        provinceId: perProvinceId,
        cityId: perCityId,
        barangayId: perBarangayId,
        zipCode: perZipCode,
      },
      { where: { id: permanentAddressId } }
    );
  }

  const addressCur = await User.count({
    include: [
      {
        model: Address,
        as: "currentAddress",
        attributes: [],
        where: { id: currentAddressId },
      },
    ],
  });
  let currentAddress: any = null;
  if (addressCur === 0) {
    currentAddress = await Address.create({
      street: curStreet,
      provinceId: curProvinceId,
      cityId: curCityId,
      barangayId: curBarangayId,
      zipCode: curZipCode,
    });
  } else {
    currentAddress = await Address.update(
      {
        street: curStreet,
        provinceId: curProvinceId,
        cityId: curCityId,
        barangayId: curBarangayId,
        zipCode: curZipCode,
      },
      { where: { id: currentAddressId } }
    );
  }

  const payloadBody = {
    firstName,
    lastName,
    mobile,
    email,
    gender: parseInt(gender),
    birthdate,
    placeOfBirth,
    nationalities,
    natureOfWork,
    sourceOfIncome,
    address,
    govtId,
    govtType,
    currentAddressId: currentAddress?.id,
    permanentAddressId: permanentAddress?.id,
    usePresentAddress,
  };

  try {
    await User.update(payloadBody, {
      //  @ts-ignore
      where: { uuid },
    });

    const uuid2 = request.user.uuid;
    const updatedUser = await User.findOne({
      attributes: [
        ["uuid", "id"],
        "firstName",
        "lastName",
        "mobile",
        "email",
        "gender",
        "birthdate",
        "placeOfBirth",
        "nationalities",
        "natureOfWork",
        "sourceOfIncome",
        "address",
        "role",
        "govtId",
        "govtType",
        "usePresentAddress",
      ],
      where: { uuid: uuid2 },
      include: [
        {
          model: Address,
          as: "currentAddress",
          attributes: ["street", "zipCode"],
          include: [
            { model: Province, as: "province", attributes: ["id", "name"] },
            { model: City, as: "city", attributes: ["id", "name"] },
            { model: Barangay, as: "barangay", attributes: ["id", "name"] },
          ],
        },
        {
          model: Address,
          as: "permanentAddress",
          attributes: ["street", "zipCode"],
          include: [
            { model: Province, as: "province", attributes: ["id", "name"] },
            { model: City, as: "city", attributes: ["id", "name"] },
            { model: Barangay, as: "barangay", attributes: ["id", "name"] },
          ],
        },
      ],
    });

    // const logs = findChangedValues({}, oldUser);
    // if (logs.length > 0) {
    await makeLog(
      `The profile of ${mobile} has been updated`,
      "profile",
      "info",
      id,
      "user"
    );
    // }

    return successResponse(
      updatedUser,
      "Your Profile updated successfully!",
      reply
    );
  } catch (err) {
    return errorResponse(`Error updating profile: ${err}`, reply, "custom");
  }
};

const generateReferral = async (request, reply) => {
  const id = request.user.id;
  const base_url = `${FRONTEND_URL}/register`;
  const referralCode = generateReferralCode();
  const user = await User.findOne({
    where: { id },
  });
  const { role } = user;
  let link = "";
  let code = "";
  let payload = {};
  if (role === ROLES.SUPERAGENT.name) {
    payload = {
      referralLinkForSA: `${base_url}?ref=SA-${referralCode}-${id}`,
      referralCodeForSA: `SA-${referralCode}-${id}`,
      referralLinkForAgent: `${base_url}?ref=A-${referralCode}-${id}`,
      referralCodeForAgent: `A-${referralCode}-${id}`,
    };
  } else if (role === ROLES.MASTERAGENT.name) {
    payload = {
      referralLinkForMA: `${base_url}?ref=MA-${referralCode}-${id}`,
      referralCodeForMA: `MA-${referralCode}-${id}`,
      referralLinkForAgent: `${base_url}?ref=A-${referralCode}-${id}`,
      referralCodeForAgent: `A-${referralCode}-${id}`,
    };
  } else if (role === ROLES.AGENT.name) {
    payload = {
      referralLinkForAgent: `${base_url}?ref=A-${referralCode}-${id}`,
      referralCodeForAgent: `A-${referralCode}-${id}`,
    };
  }
  try {
    await User.update(payload, {
      where: { id },
    });

    const updatedUser = await User.findOne({
      attributes: [
        ["uuid", "id"],
        "referralCodeForSA",
        "referralLinkForSA",
        "referralCodeForMA",
        "referralLinkForMA",
        "referralCodeForAgent",
        "referralLinkForAgent",
      ],
      where: { id },
    });

    return successResponse(
      updatedUser,
      `Referral Code and Link has been generated`,
      reply
    );
  } catch (error) {
    return errorResponse(
      `Error generating code and link: ${error}`,
      reply,
      "custom"
    );
  }
};

const kycFinish = async (request, reply) => {
  const id = request.user.id;
  try {
    await User.update(
      {
        isKYC: true,
        actionStatus: "new",
        isSupervisorApproved: false,
        supervisorWhoApprove: null,
        supervisorApprovedAt: null,

        isVerifierApproved: false,
        verifierWhoApprove: null,
        verifierApprovedAt: null,

        isDenied: false,
        personWhoDenied: null,
        deniedAt: null,
        deniedReason: null,

        isDeactivated: false,
        personWhoDeactivated: null,
        deactivatedAt: null,
        deactivatedReason: null,

        updatedAt: new Date(),
      },
      {
        where: { id },
      }
    );
    const updatedUser = await User.findOne({
      where: { id },
    });

    return successResponse(updatedUser, `Finish KYC`, reply);
  } catch (error) {
    return errorResponse(
      `Error generating code and link: ${error}`,
      reply,
      "custom"
    );
  }
};

const removeUserProfilePicture = async (request, reply) => {
  const id = request.user.id;
  const uuid = request.user.uuid;

  // const path = require("node:path");
  // const fs = require("fs");

  let isDeleted = "not deleted";
  try {
    const user = await User.findOne({
      where: { uuid },
    });
    const { mobile } = user;
    if (!user) {
      return errorResponse("User not found", reply, "custom");
    }

    // Check if the user has a profile picture
    if (user.profilePicture) {
      // Construct the path to the user's image file
      const imagePath = path.join(
        "dist",
        "server",
        "public",
        "uploads",
        "images",
        user.profilePicture
      );

      // Check if the image file exists
      if (fs.existsSync(imagePath)) {
        // Delete the image file
        fs.unlinkSync(imagePath);
        isDeleted = "deleted";
      }
    }

    await makeLog(
      `The profile picture of ${mobile} has been deleted. ${user.profilePicture} has been removed`,
      "profile",
      "info",
      id,
      "user"
    );

    // Update the user's profilePicture column to null or an empty string if needed
    user.profilePicture = ""; // Set to null or '' as per your requirement
    await user.save();
    const payload = {
      profilePicture: user.profilePicture,
    };
    return successResponse(
      payload,
      `User image ${isDeleted} successfully`,
      reply
    );
  } catch (error) {
    return errorResponse(`Error deleting image: ${error}`, reply, "custom");
  }
};

const approveOrDeactiveVerifier = async (request, reply) => {
  const id = request.params.id; // Get user ID from URL params
  const uuid = request.user.uuid;
  const userRole = request.userRole;
  return executeVerifierActions(userRole, id, uuid, request, reply);
};

const checkUser = async (request, reply) => {
  const id = request.params.id;
  const exist = await User.count({ where: { uuid: id } });

  return successResponse(
    exist,
    "Get All Users is successfully fetched!",
    reply
  );
};

const getAllUsersForOptions = async (request, reply) => {
  try {
    const users = await User.findAll({
      attributes: [
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("firstName"),
            " ",
            Sequelize.col("lastName")
          ),
          "fullName",
        ],
        "id",
      ],
      where: { role: "verifier" },
    });
    return successResponse(
      users,
      "Get All Verifier Users is successfully fetched!",
      reply
    );
  } catch (error) {
    return errorResponse(
      `Error on getting Verifier Users: ${error}`,
      reply,
      "custom"
    );
  }
};

const getBalance = async (request, reply) => {
  const uuid = request.user.uuid;
  const user = await User.findOne({
    where: { uuid },
  });

  const id = user.id;
  const wallet = await Wallet.findOne({
    where: { id },
  });

  if (user) {
    const walletData = wallet.toJSON();

    return successResponse(
      walletData,
      "The User Profile Successfully Fetch!",
      reply
    );
  } else {
    return errorResponse("User not found", reply, "custom");
  }
};

const addBalance = async (request, reply) => {
  const user_id = request.user.id;
  const uuid = request.user.uuid;
  const wallet = await Wallet.findOne({
    where: { user_id },
  });

  const { load } = request.body;
  let balance = Number(wallet.balance) + Number(load);
  const payloadBody = { balance };

  try {
    const res = await Wallet.update(payloadBody, {
      //  @ts-ignore
      where: { user_id },
    });

    if (res.length > 0) {
      return successResponse(payloadBody, "Balance Updated", reply);
    }
    return errorResponse("No updated balance", reply);
  } catch (err) {
    return errorResponse(`Error updating profile: ${err}`, reply, "custom");
  }
};

const addCredit = async (request, reply) => {
  const authid = request.user.id;
  const { id: uuid, credit } = request.body;
  const authUser = await User.findOne({
    attributes: [
      [
        Sequelize.fn(
          "CONCAT",
          Sequelize.col("firstName"),
          " ",
          Sequelize.col("lastName")
        ),
        "loaderName",
      ],
      "mobile",
    ],
    where: { id: authid },
  });

  const user = await User.findOne({
    attributes: [
      "id",
      "uuid",
      "mobile",
      [
        Sequelize.fn(
          "CONCAT",
          Sequelize.col("firstName"),
          " ",
          Sequelize.col("lastName")
        ),
        "playerName",
      ],
    ],
    include: [
      {
        model: Wallet,
        attributes: ["id", "balance"],
      },
    ],
    where: { uuid },
  });
  // @ts-ignore
  const balance = Number(user.Wallet.balance) + Number(credit);
  const loaderMobile = authUser.get("mobile");
  const playerMobile = user.get("mobile");

  const loaderName =
    authUser.get("loaderName") === " "
      ? loaderMobile
      : authUser.get("loaderName");

  const playerName =
    user.get("playerName") === " " ? playerMobile : user.get("playerName");

  try {
    const wallet = await Wallet.update(
      { balance },
      {
        //  @ts-ignore
        attributes: ["balance"],
        where: { user_id: user.id },
      }
    );

    await Transaction.create({
      //  @ts-ignore
      wallet_id: user.Wallet.id,
      amount: credit,
      type: "load",
      user_id: authid,
    });

    await makeNotif(
      user.id,
      "",
      `${loaderName} has loaded your account with ${credit} ${numWithS(
        "point",
        credit
      )}`,
      "transactions",
      "info",
      user.uuid
    );

    await makeLog(
      `${loaderName} has loaded ${playerName} (player) account with ${credit} ${numWithS(
        "point",
        credit
      )}, The current balance of ${playerName} (player) account is ${balance} ${numWithS(
        "point",
        credit
      )}`,
      "user-management",
      "info",
      user.id,
      "user"
    );

    return successResponse(wallet, "Balance Updated", reply);
  } catch (err) {
    return errorResponse(`Error updating balance: ${err}`, reply, "custom");
  }
};

const getPaymentCards = async (request, reply) => {
  const user_id = request.user.id;

  try {
    const cards = await Cards.findAll({
      attributes: ["id", [Sequelize.literal(`mobile`), "name"]],
      where: { userId: user_id },
    });

    return successResponse(cards, "The cards is successfuly fetched!", reply);
  } catch (error) {
    return errorResponse("Cards not found", reply, "custom");
  }
};

const addPaymentCard = async (request, reply) => {
  const userId = request.user.id;
  const { paymentType, mobile } = request.body;
  let response = null;
  const mobileTrim = mobilePH(mobile);
  const card = await Cards.findOne({ where: { userId, mobile: mobileTrim } });

  if (card) {
    return errorResponse(
      `The acount number is already registered!`,
      reply,
      "custom"
    );
  }

  const user = await User.findOne({ where: { id: userId } });

  const payloadStasher = {
    name: `${user.firstName} ${user.lastName}`,
    mobileNumber: mobileTrim,
  };

  try {
    if (paymentType === GCASH) {
    
        const createStasherAccount = await stasherAPI.createStasherAccount(
          request,
          payloadStasher
        );

        if(!createStasherAccount){
          return errorResponse(
            `Error on adding cards`,
            reply,
            "custom"
          );
        }

       const { id: accountId } = createStasherAccount

        const payload = {
          userId,
          mobile: mobileTrim,
          accountId,
        };
      
        await Cards.create(payload);

        user.update({
          accountId,
        });
      
    }
  } catch (error) {
    return errorResponse(
      `Failed to add payment card: ${error}`,
      reply,
      "custom"
    );
  }

  return successResponse(response, "The cards is successfuly added!", reply);
};

const authPincode = async (request, reply) => {
  const userId = request.user.id;
  const { passcode, accountNumber } = request.body;
  const payload = {
    userId,
    passcode,
    accountNumber
  }
  let authenticated = false

  const authUser = await User.findOne({
    attributes: ["passcode","id"],
    where: { id: userId },
  });

  if(authUser.passcode === null){
    return errorResponse(
      `No Pincode has been created!`,
      reply,
      "custom"
    );
  }

  if (await argon2.verify(authUser.passcode, passcode)) {
    authenticated = true
  }else{
    return errorResponse(
      `Invalid Pincode!`,
      reply,
      "custom"
    );
  }

  const card = await Cards.findOne({ attributes: ["id","accountId"], where: { userId, mobile: accountNumber } });

  return successResponse(
    { card },
    "The pincode is successfuly authenticated!",
    reply
  );
}

const logoutUserController = async (request, reply) => {
  const userId = request.user.id;
  try {
    const removeUserSession = await Session.destroy({
      where: {
        userId,
      },
    });

    return successResponse(removeUserSession, "Logout successful", reply);
  } catch (error) {
    return errorResponse(`Failed to logout: ${error}`, reply, "custom");
  }
};

const createPasscode = async (request, reply) => {
  const userId = request.user.id;
  const passcodeReq = request.body.passcode;

  const hashedPasscode = await argon2.hash(passcodeReq);

  try {
    await User.update(
      {
        passcode:hashedPasscode,
      },
      {
        where: { id: userId },
      }
    );
    const user = await User.findOne({ attributes:["passcode"], where: { id: userId } });
      const { passcode } = user
    return successResponse({ passcode }, "Creating Passcode Successfully", reply);
  } catch (error) {
    return errorResponse(`Failed to creating passcode: ${error}`, reply, "custom");
  }
}


export default {
  getAllUsers,
  addUser,
  updateUser,
  uploadUserImage,
  deleteUser,
  restoreUser,
  getUserProfile,
  updateUserProfile,
  generateReferral,
  kycFinish,
  removeUserProfilePicture,
  approveOrDeactiveVerifier,
  checkUser,
  getAllUsersForOptions,
  getBalance,
  addBalance,
  addCredit,
  getPaymentCards,
  addPaymentCard,
  authPincode,
  logoutUserController,
  createPasscode
};
