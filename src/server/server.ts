import { createServer } from 'http';
import app from './app';

const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: env.HOST,
//     methods: '*',
//   },
// });

export default server;
