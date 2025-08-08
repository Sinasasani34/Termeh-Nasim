import { forwardRef, Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CourseEntity } from '../course/entities/course.entity';
import { RegistrationEntity } from './entities/registration.entity';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([UserEntity, CourseEntity, RegistrationEntity]),
    forwardRef(() => PaymentModule)
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService]
})
export class RegistrationModule { }
