import { createServer } from 'http';
import { Server } from 'socket.io';
import env from '../config/env.config';
import EventEnum from '../utils/enums/events';
import app from './app';
import jwt from 'jsonwebtoken';
import RequestUser from '../utils/types/dtos/request-user';
import JoinServerRequest from '../utils/types/requests/events/join-server-request';

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.HOST,
    methods: '*',
  },
});

io.on(EventEnum.CONNECTION, (socket) => {
  const accessToken = socket.handshake.query.accessToken as string | undefined;

  if (accessToken == null) return socket.disconnect();

  try {
    const requestUser = jwt.verify(
      accessToken,
      env.ACCESS_TOKEN_SECRET,
    ) as RequestUser;
    socket.user = requestUser;

    socket.on(EventEnum.SEND_OFFER, (offer: RTCSessionDescriptionInit) => {
      socket.broadcast.emit(EventEnum.RECEIVE_OFFER, offer);
    });

    socket.on(EventEnum.SEND_ANSWER, (answer: RTCSessionDescriptionInit) => {
      socket.broadcast.emit(EventEnum.RECEIVE_ANSWER, answer);
    });

    socket.on(EventEnum.SEND_ICE_CANDIDATE, (candidate: RTCIceCandidate) => {
      socket.broadcast.emit(EventEnum.RECEIVE_ICE_CANDIDATE, candidate);
    });

    socket.on(
      EventEnum.JOIN_SERVER,
      async ({ serverId }: JoinServerRequest) => {
        socket.join(serverId.toString());

        const remoteSockets = await io.in(serverId.toString()).fetchSockets();
        const currentUsers = remoteSockets.map(
          (remoteSocket: any) => remoteSocket.user as RequestUser,
        );

        io.sockets
          .in(serverId.toString())
          .emit(EventEnum.JOIN_SERVER, currentUsers);
      },
    );

    // socket.on(
    //   EventEnum.JOIN_CHANNEL,
    //   async ({ channelId }: JoinChannelRequest) => {
    //     socket.join(channelId.toString());

    //     const remoteSockets = await io.in(channelId.toString()).fetchSockets();
    //     const currentUsers = remoteSockets.map(
    //       (remoteSocket: any) => remoteSocket.user as RequestUser,
    //     );

    //     io.sockets
    //       .in(channelId.toString())
    //       .emit(EventEnum.JOIN_CHANNEL, currentUsers);
    //   },
    // );

    socket.on(EventEnum.DISCONNECT, () => {
      socket.broadcast.emit(
        EventEnum.USER_DISCONNECTED,
        `${socket.id} disconnected!`,
      );
    });

    socket.on(EventEnum.DIRECT_MESSAGE, () => {});
  } catch (error) {
    // invalid token
    return socket.disconnect();
  }
});

export default server;
