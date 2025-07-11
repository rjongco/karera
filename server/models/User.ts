"use strict";

import { REGEX_NAME } from "../constants/validation";
import { DataTypes, Model, Sequelize } from "sequelize"; // Import Sequelize
import sequelize from "../config/database"; // Import your Sequelize instance
import Notification from "../models/Notification";
import Session from "../models/Session";
import Logs from "../models/Session";
import UserGroup from "./UserGroup";
import Referral from "../models/Referral";
import Address from "./Address";

enum ActionStatus {
  NEW = "new",
  FOR_APPROVAL = "forapproval",
  FOR_DEACTIVATE = "fordeactive",
  DEACTIVE = "deactive",
  APPROVED = "approved",
  DEACTIVATE = "deactivate",
  DENIED = "denied",
}

class User extends Model {
  public id: number;
  public uuid: string;
  public accountId: string;
  public status: string;
  public mobile: string;
  public otp!: string | null;
  public passcode!: string;
  public firstName!: string | null;
  public lastName!: string | null;
  public nickName!: string | null;
  public role!: string | null;
  public referralCodeForSA!: string | null;
  public referralLinkForSA!: string | null;
  public referralCodeForMA!: string | null;
  public referralLinkForMA!: string | null;
  public referralCodeForAgent!: string | null;
  public referralLinkForAgent!: string | null;
  public username!: string | null;
  public email!: string | null;
  public birthdate!: Date | null;
  public placeOfBirth!: string | null;
  public nationalities!: string | null;
  public natureOfWork!: string | null;
  public sourceOfIncome!: string | null;
  public gender!: number | null;
  public address!: string | null;
  public usePresentAddress!: string | null;
  public currentAddressId!: string | null;
  public permanentAddressId!: string | null;
  public profilePicture!: string | null;
  public govtId!: string | null;
  public govtPicture!: string | null;
  public govtIdPicture!: string | null;
  public password!: string | null;
  public otpExpiration!: Date | null;
  public otpMaxEntries!: any | number | string | null;
  public otpMaxEntriesExpiration!: Date | null;
  public isMobileVerified!: number;
  public isEmailVerified!: number;
  public actionStatus: ActionStatus;
  public isKYC!: boolean;
  public isSupervisorApproved!: boolean;
  public isVerifierApproved!: boolean;
  public isDenied!: boolean;
  public isDeactivated!: boolean;
  public supervisorWhoApprove!: string | null;
  public verifierWhoApprove!: string | null;
  public personWhoDeactivated!: string | null;
  public personWhoDenied!: string | null;
  public supervisorApprovedAt!: Date | null;
  public verifierApprovedAt!: Date | null;
  public deniedReason!: string | null;
  public deactivatedReason!: string | null;
  public deniedAt!: Date | null;
  public deactivatedAt!: Date | null;
  public commission!: Date | null;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
  public createdBy!: number | null;

  static async createUser(mobile, otp, otpExpiration) {
    try {
      const newUser = await User.create({
        mobile,
        otp,
        otpExpiration,
      });
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async findByMobile(mobile) {
    try {
      const user = await User.findOne({ where: { mobile } });
      return user;
    } catch (error) {
      console.error("Error finding user by mobile:", error);
      throw error;
    }
  }

  static async getUser(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      console.error("Error finding user by id:", error);
      throw error;
    }
  }

  static async findByUUID(uuid) {
    try {
      const user = await User.findOne({ where: { uuid: uuid } });
      return user;
    } catch (error) {
      console.error("Error finding user by id:", error);
      throw error;
    }
  }

  static async test1() {
    const affectedRows = await User.update(
      { balance: 99 },
      { where: { id: 2 } }
    );

    console.log("affectedRows " + affectedRows);
  }
}

// Define a type or interface with 'ignoreEmpty' property
type ValidationOptions = {
  name: string;
  msg: string;
  ignoreEmpty?: boolean; // 'ignoreEmpty' is optional
};

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "mobile",
        msg: "This mobile is already taken",
      },
      defaultValue: "",
      // validate: {
      //   isPhilippinePhoneNumber(value) {
      //     const phoneRegex = /^(09|\+639)\d{9}$/;
      //     if (!phoneRegex.test(value)) {
      //       throw new Error("Invalid phone number");
      //     }
      //   },
      // },
    },
    status: {
      type: DataTypes.ENUM(
        "active",
        "deactivated",
      ),
      allowNull: false,
      defaultValue: "active",
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      validate: {
        isValidRegex(value) {
          // Custom validation function to check if the value is either null or matches the regex pattern
          if (value !== null && value !== "" && !/^[a-zA-Z\s]+$/.test(value)) {
            throw new Error(
              "First name must be a valid string, empty, or null"
            );
          }
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      validate: {
        isValidRegex(value) {
          // Custom validation function to check if the value is either null or matches the regex pattern
          if (value !== null && value !== "" && !/^[a-zA-Z\s]+$/.test(value)) {
            throw new Error(
              "First name must be a valid string, empty, or null"
            );
          }
        },
      },
    },
    nickName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: <ValidationOptions>{
        name: "nickname",
        msg: "This nickname is already taken",
        ignoreEmpty: true,
      },
      defaultValue: "",
    },
    role: {
      type: DataTypes.ENUM(
        "superadmin",
        "admin",
        "supervisor",
        "verifier",
        "superagent",
        "masteragent",
        "agent",
        "operator",
        "moderator",
        "accounting",
        "player"
      ),
      allowNull: false,
      defaultValue: "player",
    },
    referralCodeForSA: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referralLinkForSA: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referralCodeForMA: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referralLinkForMA: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referralCodeForAgent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referralLinkForAgent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: <ValidationOptions>{
        name: "username",
        msg: "This username is already taken",
        ignoreEmpty: true,
      },
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: <ValidationOptions>{
        name: "email",
        msg: "This email is already taken",
        ignoreEmpty: true,
      },
      defaultValue: "",
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    placeOfBirth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nationalities: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    natureOfWork: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sourceOfIncome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false, // Allow null
      defaultValue: 0,
      validate: {
        isIn: [[0, 1, 2]], // Only allow 1 or 2
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    usePresentAddress: {
      type: DataTypes.INTEGER,
      allowNull: false, // Allow null
      defaultValue: 0,
    },
    currentAddressId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "addresses",
        key: "id",
      },
    },
    permanentAddressId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "addresses",
        key: "id",
      },
    },
    profilePicture: DataTypes.STRING,
    govtType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
    govtId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    govtPicture: DataTypes.STRING,
    govtIdPicture: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    otpExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    otpMaxEntries: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: process.env.MAX_OTP_REQUEST,
    },
    otpMaxEntriesExpiration: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isMobileVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    actionStatus: {
      type: DataTypes.ENUM(
        "new",
        "forapproval",
        "fordeactive",
        "deactive",
        "approved",
        "deactivate",
        "denied"
      ),
      allowNull: false,
      defaultValue: "new",
    },
    isDenied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isSupervisorApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isVerifierApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isKYC: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isDeactivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    supervisorWhoApprove: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
    },
    verifierWhoApprove: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
    },
    personWhoDeactivated: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
    },
    personWhoDenied: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
    },
    supervisorApprovedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    verifierApprovedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    deniedReason: {
      type: DataTypes.TEXT, // Use TEXT type for long text
      defaultValue: null,
      allowNull: true, // Allow null if needed
    },
    deactivatedReason: {
      type: DataTypes.TEXT, // Use TEXT type for long text
      defaultValue: null,
      allowNull: true, // Allow null if needed
    },
    deniedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    deactivatedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    commission: {
      type: DataTypes.DECIMAL(5, 2), // Example: 999.99
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null, // Set default value to null
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null, // Set default value to null
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null, // Set default value to null
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    // paranoid: true,  // Makes moderator to refresh throw sequelize error
  }
);

User.hasMany(UserGroup, { foreignKey: "parentId", as: "child" });
User.hasMany(UserGroup, { foreignKey: "childId", as: "parent" });

User.hasMany(Referral, { foreignKey: "inviterId", as: "inviter" });
User.hasMany(Referral, { foreignKey: "playerId", as: "player" });

User.belongsTo(Address, {
  foreignKey: "currentAddressId", // Assuming your Address model has a foreign key named "userId"
  as: "currentAddress",
});
User.belongsTo(Address, {
  foreignKey: "permanentAddressId", // Assuming your Address model has a foreign key named "userId"
  as: "permanentAddress",
});

export default User;
