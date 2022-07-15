import { Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { GatewayEntity } from './entities/gateway.entity';

@Injectable()
export class ChatService {
  messages: GatewayEntity[] = [{ name: 'Marius', text: 'heeyooo' }]
  clientToUser = {}
  //create message
  create(createGatewayDto: CreateGatewayDto) {
    const message = { ...createGatewayDto }
    this.messages.push(message);
     
    return message
  }

  //list all messages
  findAll() {
    return this.messages;
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser)
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId]
  }

  /*
  develop future method to search messanger as one
  findOne(id: number) {
    return `This action returns a #${id} gateway`;
  }*/
}
