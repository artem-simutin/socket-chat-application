import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  namespace: 'messages',
  cors: {
    origin: '*',
  },
})
export class MessagesGateway implements OnGatewayInit {
  @WebSocketServer()
  io: Server;

  constructor(private messagesService: MessagesService) {}

  afterInit() {
    console.log('Messages gateway has been initialized');
  }

  @SubscribeMessage('create')
  create(@MessageBody() text: string, @ConnectedSocket() client: Socket) {
    const author = this.messagesService.getNameByClientID(client.id);
    const message = this.messagesService.create(author, text);
    this.io.emit('message', message);
    return message;
  }

  @SubscribeMessage('find-all')
  findAll() {
    return this.messagesService.getAll();
  }

  @SubscribeMessage('join')
  joinRoom(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
    console.log('join');

    return this.messagesService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  typing(@MessageBody() isTyping: boolean, @ConnectedSocket() client: Socket) {
    const name = this.messagesService.getNameByClientID(client.id);
    client.broadcast.emit('typing', {
      name,
      isTyping,
    });
  }
}
