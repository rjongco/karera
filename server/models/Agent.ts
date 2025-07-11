import { DataTypes, Model } from 'sequelize';
import sequelize from "../config/database";
import User from './User';
import Referral from './Referral';

class Agent extends Model {
  public id: number;
  public userId: number;
  public parentId: number;
}

Agent.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  referralId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // references: {
    //   model: 'Referral',
    //   key: "id"
    // }
  },
  type: {
    type: DataTypes.ENUM('Master Agent', 'Agent'),
    defaultValue: 'Agent',
  },
  commisions: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: true,
    defaultValue: 0.0,
  }
}, {
  sequelize,
  modelName: 'agent',
  tableName: 'agents',
  timestamps: true
});

// Agent.belongsTo(Referral, {
//   foreignKey: 'referralId',
//   onDelete: 'CASCADE'
// });

// Agent.belongsTo(User, { foreignKey: "user_id" });
export default Agent;
