import { Module } from '@nestjs/common';
import { SmartCardService } from './smart-card.service';
import { SmartCardController } from './smart-card.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [SmartCardController],
  providers: [SmartCardService],
})
export class SmartCardModule { }
