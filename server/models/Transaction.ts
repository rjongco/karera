import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../config/database";

// Define Transaction model
class Transaction extends Model {
  public id: number;
  public wallet_id: number;
  public game_id: number;
  public amount!: number;
  public status!: string;
  public callbackId!: string;
  public type!: "bet" | "wonprize" | "deposit" | "load" | "withdrawal";

  public static async new(wallet_id, game_id, amt, type, status = "INITIAL") {
    // console.log(`transaction ${amt}: ${type}`);
    const amount = Math.abs(amt);
    try {
      const r = await Transaction.create({
        wallet_id,
        game_id,
        amount,
        type,
        status,
        callbackId: 0,
      });
      r.save();
      return r;
    } catch (error) {
      console.log(error);
    }
  }
}
Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    wallet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("bet", "wonprize", "deposit", "load", "withdrawal"),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    callbackId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true,
  }
);

export default Transaction;
