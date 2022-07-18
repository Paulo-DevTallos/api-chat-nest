import { Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { GatewayEntity } from './entities/gateway.entity';

@Injectable()
export class ChatService {
  messages: GatewayEntity[] = [{ name: 'Marius', text: 'heeyooo' }]
  clientToUser = {}

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser)
  }

  //create message
  async create(createGatewayDto: CreateGatewayDto, clientId: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createGatewayDto.text
    }
    await this.messages.push(message);
     
    return message
  }

  //list all messages
  findAll() {
    return this.messages;
  }

  //get client name
  getClientName(clientId: string) {
    return this.clientToUser[clientId]
  }

  /*
  develop future method to search messanger as one
  findOne(id: number) {
    return `This action returns a #${id} gateway`;
  }*/
}
