"use strict";

import { DataTypes, Model, Sequelize } from "sequelize"; // Import Sequelize
import sequelize from "../config/database"; // Import your Sequelize instance
import User from "../models/User";

class Log extends Model {
  public id: number;
  public functionality: string;
  public message: string;
  public level: string;
  public associatedId: number;
  public associatedType: string;
  public updatedAt!: Date;
  public deletedAt!: Date;
}
Log.init(
  {
    functionality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    level: {
      // (info, warning, error, etc.)
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    // Add other columns as needed
    // Add a foreign key and type for polymorphic association
    associatedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    associatedType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Log",
    tableName: "logs",
    timestamps: true,
    // paranoid: true,  // Makes moderator to refresh throw sequelize error
  }
);

Log.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Log;
