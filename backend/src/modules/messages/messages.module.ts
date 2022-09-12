import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MessagesGateway, MessagesService],
  exports: [],
})
export class MessagesModule {}
