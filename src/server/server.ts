import { createServer } from 'http';
import app from './app';
import env from '../config/env.config';
import EventEnum from '../utils/enums/events';
import jwt from 'jsonwebtoken';
import RequestUser from '../utils/types/dtos/request-user';
import JoinServerRequest from '../utils/types/requests/events/join-server-request';
import CreateMessageRequest from '../utils/types/requests/message/create-message';
import MessageService from './services/message';
import WebSocket from '../utils/types/web-socket';

const server = createServer(app);

const webSocket = new WebSocket(server, {
  cors: {
    origin: env.HOST,
    methods: '*',
  },
});

webSocket.on(EventEnum.CONNECTION, (socket) => {
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

        const remoteSockets = await webSocket
          .in(serverId.toString())
          .fetchSockets();
        const currentUsers = remoteSockets.map(
          (remoteSocket: any) => remoteSocket.user as RequestUser,
        );

        webSocket.sockets
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

    socket.on(
      EventEnum.JOIN_DIRECT_MESSAGE,
      async (directMessageId: number) => {
        console.log('JOINED');
        socket.join(directMessageId.toString());
        const remoteSockets = await webSocket
          .in(directMessageId.toString())
          .fetchSockets();
        const currentUsers = remoteSockets.map(
          (remoteSocket: any) => remoteSocket.user as RequestUser,
        );
        console.log(currentUsers);
      },
    );

    socket.on(
      EventEnum.SEND_DIRECT_MESSAGE,
      async (request: CreateMessageRequest) => {
        const messageService = new MessageService();
        const { message } = await messageService.create(
          socket.user.id,
          request,
        ); // TODO: This could be done after emitting, but this is fine for now

        webSocket.sockets
          .in(request.directMessageId!.toString())
          .emit(EventEnum.RECEIVE_DIRECT_MESSAGE, message);
      },
    );
  } catch (error) {
    // invalid token
    return socket.disconnect();
  }
});

export const io = () => webSocket;
export default server;
