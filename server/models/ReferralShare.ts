// Import necessary modules
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Assuming you have a database configuration
import User from "./User";
import ReferralCode from "./ReferralCode";

class ReferralShare extends Model {}

ReferralShare.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
		refId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'ReferralCode',
				key: "id"
			}
		},
		share1: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: true,
      defaultValue: 5.0,
    },
    share2: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: true,
      defaultValue: 2.5,
    }
  },
  {
    sequelize,
    modelName: "ReferralShare",
    tableName: "referralShares",
    timestamps: true,
  }
);

ReferralShare.belongsTo(ReferralCode, { foreignKey: "refId" });

export default ReferralShare;
