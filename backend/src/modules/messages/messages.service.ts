import { Injectable } from '@nestjs/common';
import { MessageModel } from './models/message.model';

const mock: MessageModel[] = [
  {
    id: 1,
    author: 'fake_user_1337',
    body: 'Hello sockets!',
  },
];

@Injectable()
export class MessagesService {
  messages: MessageModel[] = mock;
  users: Record<string, MessageModel['author']> = {};

  // Get all messages
  getAll() {
    return this.messages;
  }

  // Create a new message and add it into messages array
  create(author: string, body: string) {
    const latestID = this.messages[this.messages.length - 1].id;
    const message = {
      id: latestID + 1,
      author,
      body,
    };
    this.messages.push(message);
    return message;
  }

  // Connects socket id with provided name
  identify(name: string, id: string) {
    this.users[id] = name;
  }

  // Gets user name by socket id
  getNameByClientID(id: string): string | null {
    const name = this.users[id];
    if (!name) return null;
    return name;
  }
}
