import { DataTypes, Model, Op } from "sequelize";
import sequelize from "../config/database"; // Assuming your Sequelize instance is in a separate file
import User from "../models/User";

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.JSON, // Use JSON type for storing object data
      allowNull: true,
      get() {
        const userAgent = this.getDataValue("userAgent");
        return userAgent ? JSON.parse(userAgent) : null;
      },
      set(userAgent) {
        this.setDataValue("userAgent", JSON.stringify(userAgent));
      },
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Session",
    tableName: "sessions", // Optional: Define the table name explicitly
    timestamps: true,
  }
);

Session.belongsTo(User, { foreignKey: "userId", as: "user" });

Session.addHook("beforeFind", (options) => {
  const currentTime = new Date();
  options.where = {
    ...options.where,
    expiration: {
      [Op.gt]: currentTime, // Only select sessions where expiration is in the future
    },
  };
});

export default Session;
