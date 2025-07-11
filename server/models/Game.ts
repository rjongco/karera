import { DataTypes, Model } from 'sequelize';
import sequelize from "../config/database";
import Config from './Config';

class Game extends Model {
  public id: number;
  public user_id: number;
  public config_id: number;
  public name: string;
  public gross: number;

  public static async new(
    user_id: number,
    config_id: number,
    name: string,
  ): Promise<Game> {
    try {
      const game = await Game.create({
        user_id,
        config_id,
        name,
        gross: 0
      });

      return game;
    } catch (error) {
      throw new Error(`Error inserting game: ${error}`);
    }
  }
}
Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    config_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gross: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'game',
    tableName: 'games',
    timestamps: true,
  }
);

Game.hasOne(Config, { foreignKey: 'config_id' });

export default Game;

