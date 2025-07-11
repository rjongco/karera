"use strict";

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // assuming you have a database configuration module using ESM
import GameList from "../models/GameList";

("use strict");

enum status {
  OPEN = "open",
  LASTCALL = "lastcall",
  CLOSED = "closed",
  NEW = "new",
}

class GameMatch extends Model {
  public id: number;
  public gameId: number;
  public status: status;
  public createdAt!: Date;
  public updatedAt!: Date;
}

GameMatch.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "initial",
        "open",
        "lastcall",
        "closed",
        "winners",
        "new"
      ),
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: "GameMatch",
    tableName: "game-matches",
    timestamps: true,
  }
);

GameMatch.belongsTo(GameList, { foreignKey: "gameId" });

GameList.hasOne(GameMatch, { foreignKey: "gameId" });

export default GameMatch;
