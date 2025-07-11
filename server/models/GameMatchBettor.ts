"use strict";

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // assuming you have a database configuration module using ESM
import User from "../models/User";
import GameMatch from "../models/GameMatch";
import GameAsset from "../models/GameAsset";

class GameMatchBettor extends Model {
  public id: number;
  public userId: number;
  public matchId!: number;
  public amount!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

GameMatchBettor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // assetId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    // amount: {
    //   type: DataTypes.DECIMAL(10, 2),
    //   allowNull: false,
    //   defaultValue: 0,
    // },
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
  },
  {
    sequelize,
    modelName: "GameMatchBettor",
    tableName: "game-match-bettors",
    timestamps: true,
  }
);

GameMatchBettor.belongsTo(User, { foreignKey: "userId" });
GameMatchBettor.belongsTo(GameMatch, { foreignKey: "matchId" });
GameMatchBettor.belongsTo(GameAsset, { foreignKey: "assetId" });

export default GameMatchBettor;
