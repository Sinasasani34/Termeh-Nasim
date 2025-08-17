import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SmartCardService } from './smart-card.service';
import { CreateSmartCardDto } from './dto/create-smart-card.dto';
import { UpdateSmartCardDto } from './dto/update-smart-card.dto';

@Controller('smart-card')
export class SmartCardController {
  constructor(private readonly smartCardService: SmartCardService) {}

  @Post()
  create(@Body() createSmartCardDto: CreateSmartCardDto) {
    return this.smartCardService.create(createSmartCardDto);
  }

  @Get()
  findAll() {
    return this.smartCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smartCardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSmartCardDto: UpdateSmartCardDto) {
    return this.smartCardService.update(+id, updateSmartCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smartCardService.remove(+id);
  }
}
