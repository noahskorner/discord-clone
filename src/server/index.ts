import next from 'next';
import { Response, Request } from 'express';

const dev = process.env.NODE_ENV !== 'production';
const server = next({ dev });
const handle = server.getRequestHandler();

server
  .prepare()
  .then(() => {
    const env = require('../config/env.config').default;
    const app = require('./app').default;

    // NEXT PAGES
    app.get('*', (req: Request, res: Response) => {
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
