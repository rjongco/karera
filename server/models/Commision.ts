import { DataTypes, Model } from 'sequelize';
import sequelize from "../config/database";
import User from './User';
import Agent from './Agent';
import Transaction from './Transaction';

class Commissions extends Model { }

Commissions.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 4),
		allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 4),
		allowNull: false,
  },
}, {
  sequelize,
  modelName: 'commission',
  tableName: 'commissions',
  timestamps: true
});

Commissions.belongsTo(Agent, {
  foreignKey: 'agentId',
  onDelete: 'CASCADE'
});

Commissions.belongsTo(User, {
  foreignKey: 'playerId',
  onDelete: 'CASCADE'
});

Commissions.belongsTo(Transaction, {
  foreignKey: 'transaction_id',
  onDelete: 'CASCADE'
});

export default Commissions;
