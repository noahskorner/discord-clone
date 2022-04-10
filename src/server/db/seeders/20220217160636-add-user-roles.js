'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user_role',
      [
        {
          user_id: 1,
          role: 'ADMIN',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          role: 'SUPERADMIN',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_role', null, {});
  },
};
