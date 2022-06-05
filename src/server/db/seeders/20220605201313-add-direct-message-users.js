'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'direct_message_user',
      [
        {
          direct_message_id: 1,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          direct_message_id: 1,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('direct_message_user', null, {});
  },
};
