import { DataTypes, Model } from 'sequelize';
import sequelize from "../config/database";

class Config extends Model {
  public id!: number;
  public fee: number;

  public static async new(
    fee: number,
  ): Promise<Config> {
    try {
      const config = await Config.create({
        fee,
      });

      return config;
    } catch (error) {
      throw new Error(`Error inserting config: ${error}`);
    }
  }
}
Config.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
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
    modelName: 'config',
    tableName: 'configs',
    timestamps: true,
  }
);

export default Config;

