import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service'
import { CreateGatewayDto } from './dto/create-gateway.dto';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  //create messages
  @SubscribeMessage('createChatMessage')
  async create(@MessageBody() createGatewayDto: CreateGatewayDto) {
    const message = await this.chatService.create(createGatewayDto);

    this.server.emit('message', message);

    return message
  }

  @SubscribeMessage('findAllChatMessages')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(@MessageBody('name') name: string, @ConnectedSocket() client: Socket) {
    return this.chatService.identify(name, client.id) 
  }

  @SubscribeMessage('Typing')
  async typing(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket) {
    const name = await this.chatService.getClientName(client.id) 
    
    client.broadcast.emit('typing', { name, isTyping })

    return name
  }

  /*
  develop future method to search messanger as one
  @SubscribeMessage('findOneGateway')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }*/
}
