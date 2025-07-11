import {
  API_SUCCESS,
  API_FAILURE,
  VALIDATION_ERROR,
  CUSTOM_ERROR,
} from "../constants/validation";
import User from "../models/User";
import Log from "../models/Log";
import Notification from "../models/Notification";
import axios from "axios";
import { Sequelize } from "sequelize";
import UserGroup from "../models/UserGroup";
import { existsSync, mkdirSync } from "fs";
const CryptoJS = require("crypto-js");

import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc);

const getZeroNineInPhoneNo = (phoneNumber) => {
  const countryCodeRegex = /^\+63/;

  // Remove the country code prefix from the phone number
  const cleanedPhoneNumber = phoneNumber.replace(countryCodeRegex, "");
  return `0${cleanedPhoneNumber}`;
};

// Function to compare two objects and find changed values
const findChangedValues = (current: any, previous: any) => {
  const currentDate = dayjs(current.birthdate).format("YYYY-MM-DD");
  const previousDate = dayjs(previous.birthdate).format("YYYY-MM-DD");
  const messages = []; // Array to store the update messages

  if (current.email !== previous.email) {
    messages.push(`Email changed from ${previous.email} to ${current.email}`);
  }

  if (previous.firstName !== current.firstName) {
    messages.push(
      `First Name changed from ${previous.firstName} to ${current.firstName}`
    );
  }

  if (previous.lastName !== current.lastName) {
    messages.push(
      `Last Name changed from ${previous.lastName} to ${current.lastName}`
    );
  }

  if (previous.gender !== current.gender) {
    messages.push(
      `Gender changed from ${previous.gender} to ${current.gender}`
    );
  }

  if (
    dayjs(currentDate).format("YYYY-MM-DD") !==
    dayjs(previousDate).format("YYYY-MM-DD")
  ) {
    messages.push(`Birthdate changed from ${currentDate} to ${previousDate}`);
  }

  if (previous.mobile !== current.mobile) {
    messages.push(
      `Mobile changed from ${previous.mobile} to ${current.mobile}`
    );
  }

  if (previous.address !== current.address) {
    messages.push(
      `Address changed from ${previous.address} to ${current.address}`
    );
  }

  if (previous.profilePicture !== current.profilePicture) {
    messages.push(
      `Profile Picture changed from ${previous.profilePicture} to ${current.profilePicture}`
    );
  }

  if (previous.govtPicture !== current.govtPicture) {
    messages.push(
      `Government Id Picture changed from ${previous.govtPicture} to ${current.govtPicture}`
    );
  }

  return messages.join(", ");
};

const errorResponse = (err: any, reply: any, type = "validation") => {
  if (type === "validation") {
    const errorMsg = {};
    // @ts-ignore
    if (err.errors) {
      // @ts-ignore
      err.errors.map((err) => {
        // @ts-ignore
        errorMsg[err.path] = err.message;
      });
    }

    return reply.code(500).send({
      // @ts-ignore
      status: API_FAILURE,
      type: VALIDATION_ERROR,
      message: errorMsg,
    });
  } else if (type === "custom") {
    return reply.code(500).send({
      // @ts-ignore
      status: API_FAILURE,
      type: CUSTOM_ERROR,
      message: err,
    });
  }
};

const successResponse = (data: any, msg: any, reply: any) => {
  reply.code(201).send({
    status: API_SUCCESS,
    data,
    message: msg,
  });
};

const makeLog = async (
  message: any,
  functionality: any,
  level: any,
  associatedId: any,
  associatedType: any
) => {
  await Log.create({
    message,
    functionality,
    level,
    associatedId,
    associatedType,
  });
};
const makeNotif = async (
  id: any,
  title: any,
  mes: any,
  mod: any,
  types: any,
  ref: any
) => {
  await Notification.create({
    userId: id,
    title: title || "",
    message: mes,
    module: mod,
    type: types,
    reference: ref,
  });
};

//generateOtp(mobile, otp, reply);
const generateOtp = async (mobile: any, otp: any, reply: any) => {
  const trimMobile = getZeroNineInPhoneNo(mobile);
  await axios
    .post(process.env.ITEXTMO_URL, {
      Email: process.env.ITEXTMO_EMAIL,
      Password: process.env.ITEXTMO_PWD,
      Recipients: [trimMobile],
      Message: `Your verification code is ${otp}`,
      ApiCode: process.env.ITEXTMO_API_CODE,
      SenderId: process.env.ITEXTMO_SND_ID,
    })
    .then(function () {
      return successResponse(otp, "User registered successfully", reply);
    })
    .catch(function (error) {
      return errorResponse(error, reply);
    });
};

const createOrUpdateUserGroup = async (parentId: any, childId: any) => {
  // Check if the UserGroup entry already exists
  const existingUserGroup = await UserGroup.findOne({
    where: {
      parentId,
      childId,
      type: "notification",
    },
  });

  if (existingUserGroup) {
    // Entry already exists, no need to create a new one
    return existingUserGroup;
  }

  // Entry doesn't exist, create a new one
  return UserGroup.create({
    parentId,
    childId,
    type: "notification",
  });
};

const executeVerifierActions = async (
  userRole: any,
  id: any,
  authId: any,
  request: any,
  reply: any
) => {
  const { type, reason } = request.body;

  const user = await User.findOne({
    attributes: [
      "actionStatus",
      ["uuid", "userUUID"],
      ["id", "userId"],
      [
        Sequelize.fn(
          "CONCAT",
          Sequelize.col("firstName"),
          " ",
          Sequelize.col("lastName")
        ),
        "player", // Whether Supervisor or Verifier
      ],
      [
        Sequelize.literal(
          `(SELECT CONCAT(firstName, ' ', lastName) FROM users AS Supervisor WHERE Supervisor.uuid = User.personWhoDenied)`
        ),
        "personWhoDeniedName",
      ],
      [
        Sequelize.literal(
          `(SELECT id FROM users AS Supervisor WHERE Supervisor.uuid = User.personWhoDenied)`
        ),
        "personWhoDeniedId",
      ],
      [
        Sequelize.literal(
          `(SELECT CONCAT(firstName, ' ', lastName) FROM users AS Verifier WHERE Verifier.uuid = User.verifierWhoApprove)`
        ),
        "verifierWhoApprove",
      ],
      [
        Sequelize.literal(
          `(SELECT CONCAT(firstName, ' ', lastName) FROM users AS Verifier WHERE Verifier.uuid = User.personWhoDeactivated)`
        ),
        "personWhoDeactivated",
      ],
    ],
    where: { uuid: id },
  });

  const personWhoTakingActionQuery = await User.findOne({
    attributes: [
      "id",
      [
        Sequelize.fn(
          "CONCAT",
          Sequelize.col("firstName"),
          " ",
          Sequelize.col("lastName")
        ),
        "personWhoTakingAction", // Whether Supervisor or Verifier
      ],
    ],
    where: { uuid: authId },
  });

  const personWhoDeniedName = user.get("personWhoDeniedName");
  const personWhoDeniedId = user.get("personWhoDeniedId");
  const verifierWhoApproveName = user.get("verifierWhoApprove");
  const personWhoDeactivated = user.get("personWhoDeactivated");
  const playerName = user.get("player");
  const actionStatus = user.get("actionStatus");
  const userId = user.get("userId");
  const userUUID = user.get("userUUID");

  // const authUserJSON = authUser.toJSON();
  const personWhoTakingActionName = personWhoTakingActionQuery.get(
    "personWhoTakingAction"
  );
  const personWhoTakingActionId = personWhoTakingActionQuery.get("id");

  const supervisors = await UserGroup.findAll({
    attributes: ["parentId"],
    where: { childId: personWhoTakingActionId, type: "notification" },
  });

  const verifiers = await UserGroup.findAll({
    attributes: ["childId"],
    where: { parentId: personWhoTakingActionId, type: "notification" },
  });

  if (userRole === "verifier") {
    if (type === "approve") {
      if (actionStatus === "denied") {
        const payload = {
          actionStatus: "forapproval",
          isVerifierApproved: true,
          verifierWhoApprove: authId,
          verifierApprovedAt: new Date(),

          isDeactivated: false,
          personWhoDeactivated: null,
          deactivatedAt: null,
          deactivatedReason: null,

          updatedAt: new Date(),
        };

        supervisors?.map(async (obj: any) => {
          await makeNotif(
            obj.parentId,
            "",
            `For approval of player ${playerName} verified by ${personWhoTakingActionName}`,
            "user-management",
            "info",
            userUUID
          );
        });

        await makeLog(
          `${playerName} has been denied by ${personWhoDeniedName} as (supervisor) and now approved by ${personWhoTakingActionName} as (Verifier) the current status is now waiting for approval from the supervisor.`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully approved!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      } else if (actionStatus === "new") {
        const payload = {
          actionStatus: "forapproval",
          isVerifierApproved: true,
          verifierWhoApprove: authId,
          verifierApprovedAt: new Date(),
          updatedAt: new Date(),
        };

        supervisors?.map(async (obj: any) => {
          await makeNotif(
            obj.parentId,
            "",
            `For approval of player ${playerName} verified by ${personWhoTakingActionName}`,
            "user-management",
            "info",
            userUUID
          );
        });

        await makeLog(
          `${playerName} has been approved by ${personWhoTakingActionName} as (Verifier) the current status is now waiting for approval from the supervisor.`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully approved!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      }
    } else if (type === "deactive") {
      if (actionStatus === "denied") {
        const payload = {
          isDeactivated: true,
          personWhoDeactivated: authId,
          deactivatedAt: new Date(),
          actionStatus: "fordeactive",
          deactivatedReason: reason,

          isVerifierApproved: false,
          verifierWhoApprove: null,
          verifierApprovedAt: null,

          updatedAt: new Date(),
        };

        supervisors?.map(async (obj: any) => {
          await makeNotif(
            obj.parentId,
            "",
            `For approval of player ${playerName} deactivated by ${personWhoTakingActionName}`,
            "user-management",
            "info",
            userUUID
          );
        });

        await makeLog(
          `${playerName} has been denied by ${personWhoDeniedName} as (supervisor) and now deactivated by ${personWhoTakingActionName} as (Verifier) the current status is now waiting for approval from the supervisor.`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully deactivate!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      } else if (actionStatus === "new") {
        const payload = {
          isDeactivated: true,
          personWhoDeactivated: authId,
          deactivatedAt: new Date(),
          actionStatus: "fordeactive",
          deactivatedReason: reason,

          updatedAt: new Date(),
        };

        supervisors?.map(async (obj: any) => {
          await makeNotif(
            obj.parentId,
            "",
            `For approval of player ${playerName} deactivated by ${personWhoTakingActionName}`,
            "user-management",
            "info",
            userUUID
          );
        });

        await makeLog(
          `${playerName} has been deactivated by ${personWhoTakingActionName} as (Verifier) the current status is now waiting for approval from the supervisor.`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully deactivate!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      }
    }
  } else if (userRole === "supervisor") {
    if (type === "approve") {
      // Notification
      verifiers?.map(async (obj: any) => {
        await makeNotif(
          obj.childId,
          "",
          `${playerName} has been approved by ${personWhoTakingActionName}`,
          "user-management",
          "info",
          userUUID
        );
      });

      await User.update(
        {
          isKYC: false,
        },
        {
          where: { id: userId },
        }
      );

      if (actionStatus === "new") {
        const payload = {
          actionStatus: "approved",

          isSupervisorApproved: true,
          supervisorWhoApprove: authId,
          supervisorApprovedAt: new Date(),

          isVerifierApproved: true,
          verifierWhoApprove: authId,
          verifierApprovedAt: new Date(),

          updatedAt: new Date(),
        };

        await makeNotif(
          userId,
          `KYC request has been approved!`,
          `${playerName} your KYC request has been fully verified!, You can now withdraw to your wallet account`,
          "kyc",
          "info",
          userUUID
        );

        await makeLog(
          `${playerName} (player) has been approved by ${personWhoTakingActionName} as (supervisor) and also verified the player, the current status is now fully for approved`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully approved!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      } else if (actionStatus === "fordeactive") {
        const payload = {
          actionStatus: "deactive",
          isDeactivated: true,
          deactivatedAt: new Date(),

          isDenied: false,
          personWhoDenied: null,
          deniedReason: null,
          deniedAt: null,

          isSupervisorApproved: true,
          supervisorWhoApprove: authId,
          supervisorApprovedAt: new Date(),
          updatedAt: new Date(),
        };

        await makeNotif(
          userId,
          `KYC request has been denied!`,
          `${playerName} your KYC request has been denied`,
          "kyc",
          "info",
          userUUID
        );

        await makeLog(
          `${playerName} (player) has been deactivated by ${personWhoDeactivated} as (verifier) and now approved by ${personWhoTakingActionName} as (Supervisor) the current status is now fully for approved`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully approved!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      } else if (actionStatus === "forapproval") {
        const payload = {
          actionStatus: "approved",

          isSupervisorApproved: true,
          supervisorWhoApprove: authId,
          supervisorApprovedAt: new Date(),

          isDenied: false,
          personWhoDenied: null,
          deniedAt: null,
          deniedReason: null,

          updatedAt: new Date(),
        };

        await makeNotif(
          userId,
          `KYC request has been approved!`,
          `${playerName} your KYC request has been fully verified!, You can now withdraw to your wallet account`,
          "kyc",
          "info",
          userUUID
        );

        await makeLog(
          `${playerName} (player) has been approved by ${verifierWhoApproveName} as (verifier) and now approved by ${personWhoTakingActionName} as (Supervisor) the current status is now fully for deactivated`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully approved!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      } else if (actionStatus === "denied") {
        const payload = {
          actionStatus: "approved",

          isSupervisorApproved: true,
          supervisorWhoApprove: authId,
          supervisorApprovedAt: new Date(),

          isVerifierApproved: true,
          verifierWhoApprove: authId,
          verifierApprovedAt: new Date(),

          isDenied: false,
          personWhoDenied: null,
          deniedAt: null,
          deniedReason: null,

          updatedAt: new Date(),
        };

        await makeNotif(
          userId,
          `KYC request has been approved!`,
          `${playerName} your KYC request has been fully verified!, You can now withdraw to your wallet account`,
          "kyc",
          "info",
          userUUID
        );

        await makeLog(
          `${playerName} (player) has been denied by ${personWhoDeniedName} as (verifier) and now approved by ${personWhoTakingActionName} as (Supervisor) the current status is now fully for approved`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully approved!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      }
    } else if (type === "deactive") {
      // Notification
      verifiers?.map(async (obj: any) => {
        await makeNotif(
          obj.childId,
          `KYC request has been denied`,
          `${playerName} your KYC request has been denied, because ${reason}`,
          "user-management",
          "info",
          userUUID
        );
      });

      await User.update(
        {
          isKYC: false,
        },
        {
          where: { id: userId },
        }
      );

      if (actionStatus === "forapproval") {
        const payload = {
          actionStatus: "deactive",

          isDeactivated: true,
          personWhoDeactivated: authId,
          deactivatedAt: new Date(),
          deactivatedReason: reason,

          isSupervisorApproved: true,
          supervisorWhoApprove: authId,
          supervisorApprovedAt: new Date(),

          isVerifierApproved: false,
          verifierWhoApprove: null,

          updatedAt: new Date(),
        };

        await makeNotif(
          userId,
          `KYC request has been denied!`,
          `${playerName} your KYC request has been denied, because ${reason}`,
          "kyc",
          "info",
          userUUID
        );

        await makeLog(
          `${playerName} (player) has been approved by ${verifierWhoApproveName} as (verifier) and now deactivated by ${personWhoTakingActionName} as (Supervisor) the current status is now fully for deactivated`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully deactivate!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      } else if (actionStatus === "new") {
        const payload = {
          actionStatus: "deactive",

          isDeactivated: true,
          personWhoDeactivated: authId,
          deactivatedAt: new Date(),
          deactivatedReason: reason,

          isSupervisorApproved: true,
          supervisorWhoApprove: authId,
          supervisorApprovedAt: new Date(),

          updatedAt: new Date(),
        };

        await makeNotif(
          userId,
          `KYC request has been denied!`,
          `${playerName} your KYC request has been denied, because ${reason}`,
          "kyc",
          "info",
          userUUID
        );

        await makeLog(
          `${playerName} (player) has been deactived by ${personWhoTakingActionName} as (supervisor) and also verified the player, the current status is now fully for deactivated`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully deactivate!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      } else if (actionStatus === "denied") {
        const payload = {
          actionStatus: "deactive",

          isDeactivated: true,
          personWhoDeactivated: authId,
          deactivatedAt: new Date(),
          deactivatedReason: reason,

          isSupervisorApproved: true,
          supervisorWhoApprove: authId,
          supervisorApprovedAt: new Date(),

          isVerifierApproved: false,
          verifierWhoApprove: null,

          isDenied: false,
          personWhoDenied: null,
          deniedReason: null,
          deniedAt: null,

          updatedAt: new Date(),
        };

        await makeNotif(
          userId,
          `KYC request has been denied!`,
          `${playerName} your KYC request has been denied, because ${reason}`,
          "kyc",
          "info",
          userUUID
        );

        await makeLog(
          `${playerName} (player) has been denied by ${personWhoDeniedName} as (verifier) and now deactivated by ${personWhoTakingActionName} as (Supervisor) the current status is now fully for deactivated`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully deactivate!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      }
    } else if (type === "undo") {
      if (actionStatus === "approved") {
        const payload = {
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
        };

        // Notification
        verifiers?.map(async (obj: any) => {
          await makeNotif(
            obj.childId,
            "",
            `${playerName} has been undo by ${personWhoTakingActionName} from approving`,
            "user-management",
            "info",
            userUUID
          );
        });

        await makeLog(
          `${playerName} (player) has been approved by ${personWhoTakingActionName} as the (supervisor) and is now undone by ${personWhoTakingActionName} as the (supervisor). The current status is now pending, waiting for the next action of the verifiers and supervisors.`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully undo!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      } else if (actionStatus === "deactive") {
        const payload = {
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
        };

        // Notification
        verifiers?.map(async (obj: any) => {
          await makeNotif(
            obj.childId,
            "",
            `${playerName} has been undo by ${personWhoTakingActionName} from deactivating`,
            "user-management",
            "info",
            userUUID
          );
        });

        await makeLog(
          `${playerName} (player) has been deactived by ${personWhoTakingActionName} as the (supervisor) and is now undone by ${personWhoTakingActionName} as the (supervisor). The current status is now pending, waiting for the next action of the verifiers and supervisors.`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully undo!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      }
    } else if (type === "deny") {
      // Notification
      verifiers?.map(async (obj: any) => {
        await makeNotif(
          obj.childId,
          "",
          `${playerName} has been denied by ${personWhoTakingActionName}`,
          "user-management",
          "info",
          userUUID
        );
      });
      if (actionStatus === "forapproval") {
        const payload = {
          actionStatus: "denied",
          isDenied: true,
          personWhoDenied: authId,
          deniedAt: new Date(),
          deniedReason: reason,

          isDeactivated: false,
          personWhoDeactivated: null,
          deactivatedAt: null,
          deactivatedReason: null,

          updatedAt: new Date(),
        };

        await makeLog(
          `${playerName} (player) has been approved by ${verifierWhoApproveName} as the (verifier) and now denied by ${personWhoTakingActionName} as the (Supervisor). The current status is now waiting for the next action of the verifiers and supervisors.`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then((res) => {
            return successResponse(
              {},
              "User Player is successfully denied!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      } else if (actionStatus === "fordeactive") {
        const payload = {
          actionStatus: "denied",
          isDenied: true,
          deniedAt: new Date(),
          deniedReason: reason,
          personWhoDenied: authId,

          updatedAt: new Date(),
        };

        await makeLog(
          `${playerName} (player) has been deactived by ${personWhoDeactivated} as the (verifier) and now denied by ${personWhoTakingActionName} as the (Supervisor). The current status is now waiting for the next action of the verifiers and supervisors.`,
          "user-management",
          "info",
          userId,
          "user"
        );

        await User.update(payload, { where: { uuid: id } })
          .then(() => {
            return successResponse(
              {},
              "User Player is successfully denied!",
              reply
            );
          })
          .catch((err) => {
            return errorResponse(err, reply);
          });
      }
    }
  }
};

function generateRandomHexString(length: number) {
  const hexChars = "0123456789abcdef";
  let hexString = "";
  for (let i = 0; i < length; i++) {
    hexString += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
  }
  return hexString;
}

const generateReferralCode = () => {
  return generateRandomHexString(6); // Generate a 12-character hex code
};

const generateAccountId = (mobile: number) => {
  const hash = CryptoJS.SHA256(mobile);
  return parseInt(hash.toString(CryptoJS.enc.Hex).slice(0, 8), 16);
};

const generateAccountId15Digit = (mobile: string) => {
  const hash = CryptoJS.SHA256(mobile.toString());
  const hexString = hash.toString(CryptoJS.enc.Hex);

  // Take the first 16 characters (64-bit) of the hexadecimal hash and parse it as an integer
  const part1 = parseInt(hexString.slice(0, 8), 16);
  const part2 = parseInt(hexString.slice(8, 16), 16);

  // Combine parts and ensure 15 digits by formatting the string
  const combined = (part1 * part2).toString().slice(0, 15);

  // Ensure the result is exactly 15 digits long
  return combined.padStart(15, "0");
};

const numWithS = (word, numbers) => {
  return numbers > 1 ? `${word}s` : word;
};

const getNickname = (firstName, lastName, birthdate, mobile, id = 0) => {
  const f2 = firstName.toLowerCase().substring(0, 2);
  const l2 = lastName.toLowerCase().substring(0, 2);
  const [year, month, day] = birthdate.split("-");
  const monthAndDay = `${month}${day}`;

  const mob3 = mobile.slice(-3);

  return `${f2}${l2}${monthAndDay}${mob3}${id}`;
};

const mobilePH = (mobile: any) => {
  if (!mobile) {
    return;
  }
  let phoneNumber = mobile.replace(/^\+63/, "");
  // Check if the number starts with zero
  if (!phoneNumber.startsWith("0")) {
    phoneNumber = "0" + phoneNumber; // Add zero at the beginning if it's missing
  }

  return phoneNumber;
};

const convertUTCToPhilippineTime = (utcDateTime: any) => {
  const utcDate = new Date(utcDateTime);
  utcDate.setHours(utcDate.getHours() + 8); // Add 8 hours for Philippine time
  return utcDate;
};

// Function to create directory if it doesn't exist
const createDirectoryIfNotExists = (directoryPath) => {
  if (!existsSync(directoryPath)) {
    try {
      mkdirSync(directoryPath, { recursive: true });
      console.log(`Directory created: ${directoryPath}`);
    } catch (error) {
      console.error(`Error creating directory ${directoryPath}:`, error);
    }
  } else {
    console.log(`Directory already exists: ${directoryPath}`);
  }
};

export {
  getZeroNineInPhoneNo,
  successResponse,
  errorResponse,
  generateOtp,
  executeVerifierActions,
  makeLog,
  makeNotif,
  findChangedValues,
  createOrUpdateUserGroup,
  generateReferralCode,
  numWithS,
  generateAccountId,
  getNickname,
  generateAccountId15Digit,
  mobilePH,
  convertUTCToPhilippineTime,
  createDirectoryIfNotExists,
};
