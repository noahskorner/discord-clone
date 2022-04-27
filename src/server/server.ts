import { createServer } from 'http';
import { Server } from 'socket.io';
import env from '../config/env.config';
import stunConfig from '../config/stun.config';
import EventEnum from '../utils/enums/events';
import app from './app';
const { RTCPeerConnection, RTCSessionDescription } = require('wrtc');

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.HOST,
    methods: '*',
  },
});

const connections: Record<string, RTCPeerConnection> = {};

io.on('connection', (socket) => {
  socket.on(EventEnum.SEND_OFFER, async (offer: RTCSessionDescriptionInit) => {
    const peerConnection = new RTCPeerConnection(stunConfig);
    connections[socket.id] = peerConnection;
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    peerConnection.addEventListener(
      'icecandidate',
      (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          io.to(socket.id).emit(
            EventEnum.RECEIVE_ICE_CANDIDATE,
            event.candidate,
          );
        }
      },
    );
    peerConnection.addEventListener('connectionstatechange', () => {
      if (peerConnection.connectionState === 'connected') {
        console.log('peers connected!');
      }
    });

    io.to(socket.id).emit(EventEnum.RECEIVE_OFFER, answer);
  });

  socket.on(
    EventEnum.SEND_ICE_CANDIDATE,
    async (candidate: RTCIceCandidate) => {
      const peerConnection = connections[socket.id];
      await peerConnection.addIceCandidate(candidate);
    },
  );

  socket.on(EventEnum.DISCONNECT, () => {
    console.log(`${socket.id} disconnected!`);
  });
});

export default server;
