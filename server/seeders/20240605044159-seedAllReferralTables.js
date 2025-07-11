'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [users, metadata] = await queryInterface.sequelize.query("SELECT * FROM users");

    await queryInterface.bulkInsert('referralCodes', referralCodes, {});
    await queryInterface.bulkInsert('referralShares', refShares, {});
    await queryInterface.bulkInsert('agentReferrals', agentReferrals, {});
    await queryInterface.bulkInsert('referrals', referrals, {});
    
    agents.forEach((val, idx) => {
      val.userId = users[idx].id;
    });
    await queryInterface.bulkInsert('agents', agents, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('referralCodes', null, {});
    await queryInterface.bulkDelete('referralShares', null, {});
    await queryInterface.bulkDelete('agentReferrals', null, {});
    await queryInterface.bulkDelete('referrals', null, {});
    await queryInterface.bulkDelete('agents', null, {});
  }
};

/*
  Unique refCode to register the player to the agent
  RefCode to identify the share of player's bet
*/

const referralCodes = [
  {id: 1, userId: 2, code: "S0" },
  {id: 2, userId: 2, code: "S1" },

  {id: 3, userId: 3, code: "M0" },
  {id: 4, userId: 4, code: "A0" },
  {id: 5, userId: 5, code: "A1" },

  {id: 6, userId: 6, code: "M1" },
  {id: 7, userId: 7, code: "A2" },
  {id: 8, userId: 8, code: "A3" },
];

const refShares = [
  {id: 1, refId: 1, share1: 5.0, share2: 2.5 },
  {id: 2, refId: 2, share1: 4.0, share2: 1.5 },
];

const agentReferrals = [
  {id: 1, recruitId: 3, referralCodeId: 1 }, // SA to MA
  {id: 2, recruitId: 4, referralCodeId: 1 }, // MA to A
  {id: 3, recruitId: 5, referralCodeId: 1 }, // MA to A

  {id: 4, recruitId: 6, referralCodeId: 2 }, // SA to MA
  {id: 5, recruitId: 7, referralCodeId: 2 }, // MA to A
  {id: 6, recruitId: 8, referralCodeId: 2 }, // MA to A
];

// Player Referrals
const referrals = [
  { id: 1, playerId: 9, referralCodeId: 4 },
  { id: 2, playerId: 10, referralCodeId: 4 },

  { id: 3, playerId: 11, referralCodeId: 5 },
  { id: 4, playerId: 12, referralCodeId: 5 },

  { id: 5, playerId: 13, referralCodeId: 7 },
  { id: 6, playerId: 14, referralCodeId: 7 },

  { id: 7, playerId: 15, referralCodeId: 8 },
  { id: 8, playerId: 16, referralCodeId: 8 },
]

const agents = [
  { id: 1, userId: 2, referralId: 1 },

  { id: 2, userId: 3, referralId: 2 }, // SA to MA
  { id: 3, userId: 4, referralId: 3 }, // MA to A
  { id: 4, userId: 5, referralId: 3 }, // MA to A

  { id: 5, userId: 6, referralId: 2 }, // SA to MA
  { id: 6, userId: 7, referralId: 6 }, // MA to A
  { id: 7, userId: 8, referralId: 6 }, // MA to A
]








