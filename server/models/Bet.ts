import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Game from "./Game";

class Bet extends Model {
  public id!: number;
  public game_id!: number;
  public transaction_id!: number;
  // public zodiac!: 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

  public static async new(
    game_id: number,
    transaction_id: number,
    key: string,
  ): Promise<Bet> {
    try {
      // console.log(`Bet ${ZODIACS[index]}: ${amount}`)
      const bet = await Bet.create({
        game_id,
        transaction_id: transaction_id,
        zodiac: key,
      });

      return bet;
    } catch (error) {
      throw new Error(`Error inserting bet: ${error}`);
    }
  }
}

Bet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    zodiac: {
      type: DataTypes.STRING,
      // type: DataTypes.ENUM('Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "bet",
    tableName: "bets",
    timestamps: true,
  }
);

Bet.belongsTo(Game, { foreignKey: "game_id" });

export default Bet;
