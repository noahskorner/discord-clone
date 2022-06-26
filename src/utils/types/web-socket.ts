import { Server as BaseWebSocket } from 'socket.io';

class WebSocket extends BaseWebSocket {
  public async findByUserId(userId: number) {
    return Array.from(await this.fetchSockets()).find(
      (e: any) => e.user?.id === userId,
    );
  }
}

export default WebSocket;
