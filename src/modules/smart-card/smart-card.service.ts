import { Injectable } from '@nestjs/common';
import { CreateSmartCardDto } from './dto/create-smart-card.dto';
import { UpdateSmartCardDto } from './dto/update-smart-card.dto';

@Injectable()
export class SmartCardService {
  create(createSmartCardDto: CreateSmartCardDto) {

  }

  findAll() {
    return `This action returns all smartCard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} smartCard`;
  }

  update(id: number, updateSmartCardDto: UpdateSmartCardDto) {
    return `This action updates a #${id} smartCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} smartCard`;
  }
}
