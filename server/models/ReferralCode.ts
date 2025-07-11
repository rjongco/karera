// Import necessary modules
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Assuming you have a database configuration
import User from "../models/User";

class ReferralCode extends Model {}

ReferralCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
		userId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			// references: {
			// 	model: 'User',
			// 	key: "id"
			// }
		},
    code: {
      type: DataTypes.STRING(10),
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, // Automatically sets the current timestamp
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, // Automatically sets the current timestamp
    },
  },
  {
    sequelize,
    modelName: "ReferralCode",
    tableName: "referralCodes",
    timestamps: true,
  }
);

// ReferralCode.belongsTo(User, { foreignKey: "userId" });

export default ReferralCode;
