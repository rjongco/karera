'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('referralCodes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'User',
        //   key: "id"
        // }
      },
      code: {
        type: Sequelize.STRING(10),
        unique: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('referralShares', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      refId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'ReferralCode',
        //   key: "id"
        // }
      },
      share1: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: true,
        defaultValue: 5.0,
      },
      share2: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: true,
        defaultValue: 2.5,
      }
    });

    await queryInterface.createTable('agents', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'users',
        //   key: 'id'
        // },
      },
      referralId: {
        type: Sequelize.STRING(10),
      },
      type: {
        type: Sequelize.ENUM('Master Agent', 'Agent'),
        defaultValue: 'Agent',
      },
      commisions: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
        defaultValue: 0.0,
      }
    });

    await queryInterface.createTable('agentReferrals', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recruitId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      referralCodeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'ReferralCode',
        //   key: "id"
        // }
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Approved', 'Denied'),
        defaultValue: 'Pending'
      }
    });

    await queryInterface.createTable('commissions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      transactionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
      },
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('agents');
    await queryInterface.dropTable('agentReferrals');
    await queryInterface.dropTable('commissions');
    await queryInterface.dropTable('referralCodes');
    await queryInterface.dropTable('referralShares');
    
  }
};
