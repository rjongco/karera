import {
  successResponse,
  errorResponse,
  makeLog,
  makeNotif,
  generateAccountId,
  getNickname,
  mobilePH,
} from "../utils/logic";
import User from "../models/User";
import fastify from "../app";
import Session from "../models/Session";
import Address from "../models/Address";
import { Sequelize } from "sequelize";
import { mkdirSync, existsSync } from "fs";
import Referral from "../models/Referral";
import Province from "../models/Province";
import City from "../models/City";
import Barangay from "../models/Barangay";
import Wallet from "../models/Wallet";
import stasherAPI from "../api/stasher";
import { DEVELOPMENT } from "../constants";
const environment = process.env.NODE_ENV || "local";

const loginMobileController = async (request, reply) => {
  const mobile = request.body.mobile;
  //const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otp = "111111";
  const otpExpiration = new Date(Date.now() + 1 * 68000); // OTP valid for 1 minute
  const otpMaxEntriesExpiration = new Date(Date.now() + 1444 * 60000); // OTP valid for 1440 minute = 1 day

  let user = await User.findOne({ where: { mobile } });

  if (!user) {
    const msgErr =
      "Your mobile no. is not registered, Please register your mobile no.";

    return errorResponse(msgErr, reply, "custom");
  }

  if (!user.isMobileVerified) {
    const msgErr =
      "Your mobile no. is not verified, go verify your mobile no. and submit the right otp for fully verification";
    return errorResponse(msgErr, reply, "custom");
  }

  if (user.status === "deactivated") {
    const msgErr = "Your acount is deactivated";
    return errorResponse(msgErr, reply, "custom");
  }

  const { id, uuid } = user;
  user.otp = otp;
  user.otpExpiration = otpExpiration;
  user.otpMaxEntriesExpiration = otpMaxEntriesExpiration;
  user = await user.save();

  await makeLog(
    `The mobile no. ${mobile} was login and an OTP No. ${otp} is sent`,
    "authentication",
    "info",
    id,
    "user"
  );

  const payload = {
    data: {
      id: uuid,
      mobile,
      countdownSeconds: 60,
    },
  };

  return successResponse(
    payload,
    "Mobile No. is now login, and here's the 1-minute OTP.",
    reply
  );
};

const verifyOTPLoginController = async (request, reply) => {
  const requestId = request.body.id;
  const otp = request.body.otp;

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
  // @ts-ignore
  Wallet.associate && Wallet.associate(models);

  const user = await User.findOne({
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
      "birthdate",
      "placeOfBirth",
      "nationalities",
      "natureOfWork",
      "sourceOfIncome",
      "gender",
      "address",
      "profilePicture",
      "mobile",
      "accountId",
      "otp",
      "otpExpiration",
      "govtType",
      "govtId",
      "govtPicture",
      "govtIdPicture",
      "referralCodeForSA",
      "referralLinkForSA",
      "referralCodeForMA",
      "referralLinkForMA",
      "referralCodeForAgent",
      "referralLinkForAgent",
      "usePresentAddress",
      "isSupervisorApproved",
      "isVerifierApproved",
      "isDeactivated",
      "actionStatus",
      "isKYC",
      "passcode"
    ],
    where: { uuid: requestId },
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
      {
        model: Wallet,
        attributes: ["balance"],
      },
    ],
  });

  const {
    id,
    uuid,
    firstName,
    lastName,
    nickName,
    role,
    email,
    mobile,
    accountId,
    birthdate,
    placeOfBirth,
    nationalities,
    natureOfWork,
    sourceOfIncome,
    gender,
    address,
    profilePicture,
    otp: userOtp,
    otpExpiration,
    //  @ts-ignore
    govtType,
    govtId,
    govtPicture,
    //  @ts-ignore
    govtIdPicture,
    referralCodeForSA,
    referralLinkForSA,
    referralCodeForMA,
    referralLinkForMA,
    referralCodeForAgent,
    referralLinkForAgent,
    //  @ts-ignore
    currentAddress,
    //  @ts-ignore
    permanentAddress,
    usePresentAddress,
    isSupervisorApproved,
    isVerifierApproved,
    isDeactivated,
    actionStatus,
    isKYC,
    //  @ts-ignore
    Wallet: wallet,
    passcode
  } = user;
  if (new Date() > new Date(otpExpiration)) {
    const msgErr = "OTP expired";
    return errorResponse(msgErr, reply, "custom");
  }

  if (!user || userOtp !== otp) {
    const msgErr = "Invalid OTP";
    return errorResponse(msgErr, reply, "custom");
  }

  const auth = {
    id: uuid,
    firstName,
    lastName,
    nickName,
    role,
    email,
    mobile,
    accountId,
    birthdate,
    placeOfBirth,
    nationalities,
    natureOfWork,
    sourceOfIncome,
    gender,
    address,
    profilePicture,
    govtType,
    govtId,
    govtPicture,
    govtIdPicture,
    referralCodeForSA,
    referralLinkForSA,
    referralCodeForMA,
    referralLinkForMA,
    referralCodeForAgent,
    referralLinkForAgent,
    currentAddress,
    permanentAddress,
    usePresentAddress,
    isSupervisorApproved,
    isVerifierApproved,
    isDeactivated,
    actionStatus,
    wallet,
    isKYC,
    passcode
  };

  const token = fastify.jwt.sign({ uuid });
  const { session } = request;
  const expirationTime = new Date();
  expirationTime.setDate(expirationTime.getDate() + 1); // Set expiration to 1 day from now

  await Session.create({
    userId: id,
    ipAddress: session.ipAddress,
    userAgent: session.userAgent,
    expiration: expirationTime,
  });

  await makeLog(
    `The OTP No. ${otp} was entered correctly and successfully login.`,
    "authentication",
    "info",
    id,
    "user"
  );
  const payload = {
    data: {
      auth,
      mobile,
      token,
    },
  };

  return successResponse(
    payload,
    "Your OTP is Valid, You can login now.",
    reply
  );
};

const verfyMobileController = async (request, reply) => {
  const mobile = request.body.mobile;
  const otp = "111111";
  const otpExpiration = new Date(Date.now() + 1 * 68000); // OTP valid for 1 minute
  const otpMaxEntriesExpiration = new Date(Date.now() + 1444 * 60000); // OTP valid for 1440 minute = 1 day

  let user = await User.findOne({
    where: { mobile },
  });

  if (!user) {
    const msgErr =
      "Your mobile no. is not registered, Please register your mobile no.";

    return errorResponse(msgErr, reply, "custom");
  }

  if (user) {
    user.update({
      mobile,
      otp,
      otpExpiration,
      otpMaxEntriesExpiration,
    });
  }

  const { uuid, id: userId } = user;

  const payload = {
    data: {
      id: uuid,
      mobile,
      countdownSeconds: 60,
    },
  };
  await makeLog(
    `The mobile no. ${mobile} is requesting for mobile verification and OTP No. ${otp} was sent`,
    "authentication",
    "info",
    userId,
    "user"
  );

  return successResponse(
    payload,
    "Mobile No. is now verified, and here's the 1-minute OTP.",
    reply
  );
};

const verfyMobileOTPController = async (request, reply) => {
  const id = request.body.id;
  const otp = request.body.otp;
  const referralCode = request.body.referralCode;

  let user = await User.findOne({
    attributes: [
      "id",
      "uuid",
      "otp",
      "isMobileVerified",
      "otpExpiration",
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
    where: { uuid: id },
  });

  // @ts-ignore
  const { id: userId, mobile, uuid } = user;
  const playerName = user.get("playerName");
  const wallet = await Wallet.count({ where: { user_id: userId } });
  if (wallet === 0) {
    await Wallet.create({
      user_id: userId,
    });
  }

  if (referralCode) {
    const userSA = await User.findOne({
      attributes: [
        "id",
        "mobile",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("firstName"),
            " ",
            Sequelize.col("lastName")
          ),
          "inviterName",
        ],
      ],
      where: { referralCodeForSA: referralCode },
    });

    const userMA = await User.findOne({
      attributes: [
        "id",
        "mobile",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("firstName"),
            " ",
            Sequelize.col("lastName")
          ),
          "inviterName",
        ],
      ],
      where: { referralCodeForMA: referralCode },
    });

    const userAgent = await User.findOne({
      attributes: [
        "id",
        "mobile",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("firstName"),
            " ",
            Sequelize.col("lastName")
          ),
          "inviterName",
        ],
      ],
      where: { referralCodeForAgent: referralCode },
    });

    const playerMobile = mobile;
    const playerNameVal = playerName === " " ? playerMobile : playerName;

    let parts = referralCode.split("-");
    let roleInitial = parts[0];

    if (roleInitial === "SA") {
      if (userSA === null) {
        const msgErr =
          "Your referral link is invalid, Please register the right referral link";

        return errorResponse(msgErr, reply, "custom");
      } else {
        const inviterName = userSA.get("inviterName");
        const inviterMobile = userSA.mobile;
        const inviterNameVal =
          // @ts-ignore
          inviterName === " " ? inviterMobile : inviterName;
        const referralSA = await User.count({
          include: [
            {
              model: Referral,
              as: "inviter",
              attributes: [],
              where: { inviterId: userSA.id, playerId: userId },
            },
          ],
        });

        if (referralSA === 0) {
          if (user) {
            user.update({
              role: "masteragent",
            });
          }
          Referral.create({
            inviterId: userSA.id,
            playerId: userId,
          })
            .then(async () => {
              await makeNotif(
                userSA.id,
                "",
                `${playerNameVal} has been registered to your referral link.`,
                "referrals",
                "info",
                uuid
              );
              await makeLog(
                `${playerNameVal} (player) has been registered to ${inviterNameVal} referral's link.`,
                "user-management",
                "info",
                userId,
                "user"
              );
            })
            .catch((error) => {
              return errorResponse(error, reply, "custom");
            });
        } else {
          const msgErr =
            "You account has been already registered, create a new account";

          return errorResponse(msgErr, reply, "custom");
        }
      }
    } else if (roleInitial === "MA") {
      if (userMA === null) {
        const msgErr =
          "Your referral link is invalid, Please register the right referral link";

        return errorResponse(msgErr, reply, "custom");
      } else {
        const inviterName = userMA.get("inviterName");
        const inviterMobile = userMA.mobile;
        const inviterNameVal =
          // @ts-ignore
          inviterName === " " ? inviterMobile : inviterName;
        const referralMA = await User.count({
          include: [
            {
              model: Referral,
              as: "inviter",
              attributes: [],
              where: { inviterId: userMA.id, playerId: userId },
            },
          ],
        });

        if (referralMA === 0) {
          if (user) {
            user.update({
              role: "agent",
            });
          }
          Referral.create({
            inviterId: userMA.id,
            playerId: userId,
          })
            .then(async () => {
              await makeNotif(
                userMA.id,
                "",
                `${playerNameVal} has been registered to your referral link.`,
                "referrals",
                "info",
                uuid
              );
              await makeLog(
                `${playerNameVal} (player) has been registered to ${inviterNameVal} referral's link.`,
                "user-management",
                "info",
                userId,
                "user"
              );
            })
            .catch((error) => {
              return errorResponse(error, reply, "custom");
            });
        } else {
          const msgErr =
            "You account has been already registered, create a new account";

          return errorResponse(msgErr, reply, "custom");
        }
      }
    } else if (roleInitial === "A") {
      if (userAgent === null) {
        const msgErr =
          "Your referral link is invalid, Please register the right referral link";

        return errorResponse(msgErr, reply, "custom");
      } else {
        const inviterName = userAgent.get("inviterName");
        const inviterMobile = userAgent.mobile;
        const inviterNameVal =
          // @ts-ignore
          inviterName === " " ? inviterMobile : inviterName;
        const referralAgent = await User.count({
          include: [
            {
              model: Referral,
              as: "inviter",
              attributes: [],
              where: { inviterId: userAgent.id, playerId: userId },
            },
          ],
        });

        if (referralAgent === 0) {
          if (user) {
            user.update({
              role: "player",
            });
          }
          Referral.create({
            inviterId: userAgent.id,
            playerId: userId,
          })
            .then(async () => {
              await makeNotif(
                userAgent.id,
                "",
                `${playerNameVal} has been registered to your referral link.`,
                "referrals",
                "info",
                uuid
              );
              await makeLog(
                `${playerNameVal} (player) has been registered to ${inviterNameVal} referral's link.`,
                "user-management",
                "info",
                userId,
                "user"
              );
            })
            .catch((error) => {
              return errorResponse(error, reply, "custom");
            });
        } else {
          const msgErr =
            "You account has been already registered, create a new account";

          return errorResponse(msgErr, reply, "custom");
        }
      }
    } else {
      const msgErr =
        "Your referral link is invalid, Please register the right referral link";

      return errorResponse(msgErr, reply, "custom");
    }
  }

  if (new Date() > new Date(user.otpExpiration)) {
    const msgErr = "OTP expired";

    return errorResponse(msgErr, reply, "custom");
  }

  if (!user || user.otp !== otp) {
    const msgErr = "Invalid OTP";

    return errorResponse(msgErr, reply, "custom");
  }

  user.otp = null;
  user.isMobileVerified = 1;
  user = await user.save();

  const payload = {
    data: {
      id: user.uuid,
      mobile,
    },
  };
  await makeLog(
    `The OTP No. ${otp} was entered correctly and successfully registered.`,
    "authentication",
    "info",
    userId,
    "user"
  );

  return successResponse(
    payload,
    "Your OTP is Valid, You can login now.",
    reply
  );
};

const registerMobileController = async (request, reply) => {
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const birthdate = request.body.birthdate;
  const mobile = request.body.mobile;

  //const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otp = "111111";
  const otpExpiration = new Date(Date.now() + 1 * 68000); // OTP valid for 1 minute
  const otpMaxEntriesExpiration = new Date(Date.now() + 1444 * 60000); // OTP valid for 1440 minute = 1 day

  // const isApiAvailable = await stasherAPI.checkApiAvailability();

  // const accountId = generateAccountId(mobile);

  let user = await User.findOne({
    where: { mobile },
  });

  if (user) {
    const msgErr = "Your mobile no. is already registered";
    return errorResponse(msgErr, reply, "custom");
  }

  // if (!isApiAvailable) {
  //   const msgErr = "Authentication Error";
  //   return errorResponse(msgErr, reply, "custom");
  // }

  let phoneNumber = mobilePH(mobile);

  if (!user) {
    await User.create({
      firstName,
      lastName,
      mobile,
      birthdate,
      username: null,
      email: null,
      otp,
      otpExpiration,
      supervisorWhoApprove: null,
      verifierWhoApprove: null,
      personWhoDeactivated: null,
      personWhoDenied: null,
    })
      .then(async ({ id: userId, uuid }) => {
        const payload = {
          data: {
            id: uuid,
            mobile,
            countdownSeconds: 60,
          },
        };

        // Update user
        const user = await User.findOne({
          where: { mobile },
        });

        if (user) {
          const nicknameUserId = user.id;
          const nickName = getNickname(
            firstName,
            lastName,
            birthdate,
            mobile,
            nicknameUserId
          );

          const payloadStasher = {
            name: `${firstName} ${lastName}`,
            mobileNumber: phoneNumber,
          };

          // const { id: accountId } = await stasherAPI.createStasherAccount(
          //   request,
          //   payloadStasher
          // );

          user.update({
            nickName,
            // accountId:null,
          });
        }

        // Check if the folder exists, and create it if it doesn't
        const uploadsProfilePicFolderPath = `${
          environment === DEVELOPMENT ? "./dist/server" : "."
        }/public/uploads/images/profile-pictures/${uuid}`;
        const uploadsGovtPicFolderPath = `${
          environment === DEVELOPMENT ? "./dist/server" : "."
        }/public/uploads/images/govt-pictures/${uuid}`;
        if (!existsSync(uploadsProfilePicFolderPath)) {
          mkdirSync(uploadsProfilePicFolderPath, { recursive: true });
        }
        if (!existsSync(uploadsGovtPicFolderPath)) {
          mkdirSync(uploadsGovtPicFolderPath, { recursive: true });
        }

        await makeNotif(
          userId,
          "Welcome to Karera Live!",
          `We’re so happy that you’re here! You may now enjoy and Immerse Yourself in the Thrill of Live Betting 
          Game here at Karera Live! \n
          To access all features, especially for withdrawals, start the identity verification process (KYC) now. \n
          To complete your identity verification, you'll need:`,
          "welcome",
          "info",
          null
        );

        await makeLog(
          `The mobile no. ${mobile} is successfully registered and OTP No. ${otp} is sent`,
          "authentication",
          "info",
          userId,
          "user"
        );

        return successResponse(
          payload,
          "Mobile No. is now registered, and here's the 1-minute OTP.",
          reply
        );
      })
      .catch((err) => {
        // return errorResponse(err, reply);
        return errorResponse(err, reply, "custom");
      });
  }
};

const verifyOTPController = async (request, reply) => {
  const id = request.body.id;
  const otp = request.body.otp;
  const referralCode = request.body.referralCode;

  let user = await User.findOne({
    attributes: [
      "id",
      "uuid",
      "otp",
      "isMobileVerified",
      "otpExpiration",
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
    where: { uuid: id },
  });

  // @ts-ignore
  const { id: userId, mobile, uuid } = user;
  const playerName = user.get("playerName");
  const wallet = await Wallet.count({ where: { user_id: userId } });
  if (wallet === 0) {
    await Wallet.create({
      user_id: userId,
    });
  }

  if (referralCode !== null) {
    const userSA = await User.findOne({
      attributes: [
        "id",
        "mobile",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("firstName"),
            " ",
            Sequelize.col("lastName")
          ),
          "inviterName",
        ],
      ],
      where: { referralCodeForSA: referralCode },
    });

    const userMA = await User.findOne({
      attributes: [
        "id",
        "mobile",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("firstName"),
            " ",
            Sequelize.col("lastName")
          ),
          "inviterName",
        ],
      ],
      where: { referralCodeForMA: referralCode },
    });

    const userAgent = await User.findOne({
      attributes: [
        "id",
        "mobile",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("firstName"),
            " ",
            Sequelize.col("lastName")
          ),
          "inviterName",
        ],
      ],
      where: { referralCodeForAgent: referralCode },
    });

    let parts = referralCode.split("-");
    let roleInitial = parts[0];

    const playerMobile = mobile;
    const playerNameVal = playerName === " " ? playerMobile : playerName;

    if (roleInitial === "SA") {
      if (userSA === null) {
        const msgErr =
          "Your referral link is invalid, Please register the right referral link";

        return errorResponse(msgErr, reply, "custom");
      } else {
        const inviterName = userSA.get("inviterName");
        const inviterMobile = userSA.mobile;
        const inviterNameVal =
          // @ts-ignore
          inviterName === " " ? inviterMobile : inviterName;
        const referralSA = await User.count({
          include: [
            {
              model: Referral,
              as: "inviter",
              attributes: [],
              where: { inviterId: userSA.id, playerId: userId },
            },
          ],
        });

        if (referralSA === 0) {
          if (user) {
            user.update({
              role: "masteragent",
            });
          }
          Referral.create({
            inviterId: userSA.id,
            playerId: userId,
          })
            .then(async () => {
              await makeNotif(
                userSA.id,
                "",
                `${playerNameVal} has been registered to your referral link.`,
                "referrals",
                "info",
                uuid
              );
              await makeLog(
                `${playerNameVal} (player) has been registered to ${inviterNameVal} referral's link.`,
                "user-management",
                "info",
                userId,
                "user"
              );
            })
            .catch((error) => {
              return errorResponse(error, reply, "custom");
            });
        } else {
          const msgErr =
            "You account has been already registered, create a new account";

          return errorResponse(msgErr, reply, "custom");
        }
      }
    } else if (roleInitial === "MA") {
      if (userMA === null) {
        const msgErr =
          "Your referral link is invalid, Please register the right referral link";

        return errorResponse(msgErr, reply, "custom");
      } else {
        const inviterName = userMA.get("inviterName");
        const inviterMobile = userMA.mobile;
        const inviterNameVal =
          // @ts-ignore
          inviterName === " " ? inviterMobile : inviterName;
        const referralMA = await User.count({
          include: [
            {
              model: Referral,
              as: "inviter",
              attributes: [],
              where: { inviterId: userMA.id, playerId: userId },
            },
          ],
        });

        if (referralMA === 0) {
          if (user) {
            user.update({
              role: "agent",
            });
          }
          Referral.create({
            inviterId: userMA.id,
            playerId: userId,
          })
            .then(async () => {
              await makeNotif(
                userMA.id,
                "",
                `${playerNameVal} has been registered to your referral link.`,
                "referrals",
                "info",
                uuid
              );
              await makeLog(
                `${playerNameVal} (player) has been registered to ${inviterNameVal} referral's link.`,
                "user-management",
                "info",
                userId,
                "user"
              );
            })
            .catch((error) => {
              return errorResponse(error, reply, "custom");
            });
        } else {
          const msgErr =
            "You account has been already registered, create a new account";

          return errorResponse(msgErr, reply, "custom");
        }
      }
    } else if (roleInitial === "A") {
      if (userAgent === null) {
        const msgErr =
          "Your referral link is invalid, Please register the right referral link";

        return errorResponse(msgErr, reply, "custom");
      } else {
        const inviterName = userAgent.get("inviterName");
        const inviterMobile = userAgent.mobile;
        const inviterNameVal =
          // @ts-ignore
          inviterName === " " ? inviterMobile : inviterName;
        const referralAgent = await User.count({
          include: [
            {
              model: Referral,
              as: "inviter",
              attributes: [],
              where: { inviterId: userAgent.id, playerId: userId },
            },
          ],
        });

        if (referralAgent === 0) {
          if (user) {
            user.update({
              role: "player",
            });
          }
          Referral.create({
            inviterId: userAgent.id,
            playerId: userId,
          })
            .then(async () => {
              await makeNotif(
                userAgent.id,
                "",
                `${playerNameVal} has been registered to your referral link.`,
                "referrals",
                "info",
                uuid
              );
              await makeLog(
                `${playerNameVal} (player) has been registered to ${inviterNameVal} referral's link.`,
                "user-management",
                "info",
                userId,
                "user"
              );
            })
            .catch((error) => {
              return errorResponse(error, reply, "custom");
            });
        } else {
          const msgErr =
            "You account has been already registered, create a new account";

          return errorResponse(msgErr, reply, "custom");
        }
      }
    } else {
      const msgErr =
        "Your referral link is invalid, Please register the right referral link";

      return errorResponse(msgErr, reply, "custom");
    }
  }

  if (new Date() > new Date(user.otpExpiration)) {
    const msgErr = "OTP expired";

    return errorResponse(msgErr, reply, "custom");
  }

  if (!user || user.otp !== otp) {
    const msgErr = "Invalid OTP";

    return errorResponse(msgErr, reply, "custom");
  }

  user.otp = null;
  user.isMobileVerified = 1;
  user = await user.save();

  const payload = {
    data: {
      id: user.uuid,
      mobile,
    },
  };
  await makeLog(
    `The OTP No. ${otp} was entered correctly and successfully registered.`,
    "authentication",
    "info",
    userId,
    "user"
  );

  return successResponse(
    payload,
    "Your OTP is Valid, You can login now.",
    reply
  );
};

const resendOTPController = async (request, reply) => {
  const id = request.body.id;

  // const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otp = "111111";
  const otpExpiration = new Date(Date.now() + 1 * 65000); // OTP valid for 1 minute

  let user = await User.findOne({ where: { uuid: id } });

  if (new Date() > new Date(user.otpMaxEntriesExpiration)) {
    const otpMaxEntriesExpiration = new Date(Date.now() + 1444 * 60000); // OTP valid for 1440 minute = 1 day
    user.otpMaxEntries = process.env.MAX_OTP_REQUEST;
    user.otpMaxEntriesExpiration = otpMaxEntriesExpiration;
  }
  const { id: userId, mobile } = user;
  if (!user || user.otpMaxEntries === 0) {
    const msgErr = "You reach the maximum otp request";

    await makeLog(
      `The OTP No. ${otp} is successfully re-sent`,
      "authentication",
      "info",
      userId,
      "user"
    );

    return errorResponse(msgErr, reply, "custom");
  }
  const otpMaxEntriesNew = user.otpMaxEntries - 1;
  user.otp = otp;
  user.otpExpiration = otpExpiration;
  user.otpMaxEntries = otpMaxEntriesNew;
  user = await user.save();

  const payload = {
    data: {
      id: user.uuid,
      mobile,
      countdownSeconds: 60,
    },
  };

  await makeLog(
    `The OTP No. ${otp} is successfully re-sent`,
    "authentication",
    "info",
    userId,
    "user"
  );

  return successResponse(payload, "Resending OTP success", reply);
};

export default {
  loginMobileController,
  verifyOTPLoginController,
  registerMobileController,
  verfyMobileController,
  verfyMobileOTPController,
  verifyOTPController,
  resendOTPController,
};

/* Keep for updating OTP
  let user = await User.findOne({ where: { mobile } });

  // if (!user) {
  // } else {
  //   user.otp = otp;
  //   user.otpExpiration = otpExpiration;
  //   await user
  //     .save()
  //     .then(() => {
  //       //generateOtp(mobile, otp, reply);
  //       return successResponse(otp, "Here's the 1-minute OTP.", reply);
  //     })
  //     .catch((err: FastifyError) => {
  //       return errorResponse(err, reply);
  //     });
  // }

*/
