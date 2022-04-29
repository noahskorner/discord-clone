import { createServer } from 'http';
import { Server } from 'socket.io';
import env from '../config/env.config';
import EventEnum from '../utils/enums/events';
import app from './app';

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.HOST,
    methods: '*',
  },
});

io.on(EventEnum.CONNECTION, (socket) => {
  socket.broadcast.emit(EventEnum.USER_CONNECTED, `${socket.id} connected!`);

  socket.on(EventEnum.SEND_OFFER, (offer: RTCSessionDescriptionInit) => {
    socket.broadcast.emit(EventEnum.RECEIVE_OFFER, offer);
  });

  socket.on(EventEnum.SEND_ANSWER, (answer: RTCSessionDescriptionInit) => {
    socket.broadcast.emit(EventEnum.RECEIVE_ANSWER, answer);
  });

  socket.on(EventEnum.SEND_ICE_CANDIDATE, (candidate: RTCIceCandidate) => {
    socket.broadcast.emit(EventEnum.RECEIVE_ICE_CANDIDATE, candidate);
  });

  socket.on(EventEnum.DISCONNECT, () => {
    socket.broadcast.emit(
      EventEnum.USER_DISCONNECTED,
      `${socket.id} disconnected!`,
    );
  });
});

export default server;
