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
  DIRECT_MESSAGE = 'direct-message',
}

export default EventEnum;
