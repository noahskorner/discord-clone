/* eslint-disable no-undef */
import { exec } from 'child_process';

const seedDatabase = async () => {
  await new Promise((resolve, reject) => {
    exec(
      'npx sequelize-cli db:seed:all --config src/server/db/config.json --seeders-path src/server/db/seeders',
      { env: process.env },
      (err) => (err ? reject(err) : resolve(() => {})),
    );
  });
};

export default seedDatabase;
