// Import necessary modules
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Assuming you have a database configuration
import User from "../models/User";
// Define your Sequelize model for user groups
class AgentReferral extends Model {}

AgentReferral.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recruitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    referralCodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ReferralCode",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Denied'),
      defaultValue: 'Pending'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  },
  {
    sequelize,
    modelName: "AgentReferral",
    tableName: "agentReferrals",
    timestamps: true,
  }
);

// Define associations if needed
// @ts-ignore
AgentReferral.associate = (models) => {
  AgentReferral.belongsTo(models.User, {
    foreignKey: "inviterId",
    onDelete: "CASCADE",
  });
  AgentReferral.belongsTo(models.User, {
    foreignKey: "entryId",
    onDelete: "CASCADE",
  });
  AgentReferral.belongsTo(models.ReferralCode, {
    foreignKey: "referralCodeId",
    onDelete: "CASCADE",
  });
};

export default AgentReferral;
