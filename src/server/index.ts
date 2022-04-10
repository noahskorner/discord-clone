import app from './app';
import next from 'next';
import cors from 'cors';

const dev = process.env.NODE_ENV !== 'production';
const server = next({ dev });
const handle = server.getRequestHandler();

server
  .prepare()
  .then(() => {
    const env = require('../config/env.config').default;

    // DATABASE
    const db = require('./db/models').default;
    db.sequelize.sync();
    // if (process.env.NODE_ENV !== 'production') {
    //   db.sequelize.sync({ force: true }).then(() => {
    //     console.log('Dropping, re-syncing, and seeding database');
    //     require('./db').default();
    //   });
    // }

    // ROUTES
    const router = require('./routes').default;
    app.use(
      cors({
        origin: [env.HOST],
      }),
    );
    app.use('/api/v1', router);
    app.get('*', (req, res) => {
      return handle(req, res);
    });

    // START APP
    app.listen(env.PORT, () => {
      console.log(`Server now listening on port ${env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
