// Import necessary modules
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Assuming you have a database configuration
import User from "../models/User";
// Define your Sequelize model for user groups
class Referral extends Model {}

Referral.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    referralCodeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: {
      //   model: 'ReferralCode',
      //   key: "id"
      // }
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
    modelName: "Referral",
    tableName: "referrals",
    timestamps: true,
  }
);

// Define associations if needed
// @ts-ignore
Referral.associate = (models) => {
  Referral.belongsTo(models.User, {
    foreignKey: "inviterId",
    onDelete: "CASCADE",
  });
  Referral.belongsTo(models.User, {
    foreignKey: "playerId",
    onDelete: "CASCADE",
  });
};

export default Referral;
