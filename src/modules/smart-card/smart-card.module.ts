import { Module } from '@nestjs/common';
import { SmartCardService } from './smart-card.service';
import { SmartCardController } from './smart-card.controller';

@Module({
  controllers: [SmartCardController],
  providers: [SmartCardService],
})
export class SmartCardModule {}
