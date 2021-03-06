'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'friend',
      [
        {
          id: 1,
          requester_id: 1,
          addressee_id: 2,
          accepted: true,
          accepted_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          requester_id: 1,
          addressee_id: 3,
          accepted: true,
          accepted_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
