/* eslint-disable no-unused-vars */
enum EventEnum {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  JOIN_SERVER = 'join-server',
  JOIN_CHANNEL = 'join-channel',
  SEND_OFFER = 'send-offer',
  RECEIVE_OFFER = 'receive-offer',
  SEND_ANSWER = 'send-answer',
  RECEIVE_ANSWER = 'receive-answer',
  SEND_ICE_CANDIDATE = 'send-ice-candidate',
  RECEIVE_ICE_CANDIDATE = 'receive-ice-candidate',
  USER_CONNECTED = 'user-connected',
  USER_DISCONNECTED = 'user-disconnected',
  JOIN_DIRECT_MESSAGE = 'join-direct-message',
  SEND_DIRECT_MESSAGE = 'send-direct-message',
  RECEIVE_DIRECT_MESSAGE = 'receive-direct-message',
}

export default EventEnum;
