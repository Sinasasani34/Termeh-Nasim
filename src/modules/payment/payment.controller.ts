import { Body, Controller, HttpStatus, Post, Query, Redirect, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { RegistrationService } from '../registration/registration.service';
import { PaymentStatus } from '../registration/entities/registration.entity';
import { Response } from 'express';
import { CreateRegistrationDto } from '../registration/dto/create-registration.dto';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private registrationService: RegistrationService
  ) { }

  @Post()
  async create(
    @Body() createRegistrationDto: CreateRegistrationDto,
    @Res() res: Response,
  ) {
    try {
      // ۱. ذخیره اطلاعات ثبت‌نام با وضعیت "در انتظار پرداخت"
      const registration = await this.registrationService.createRegistration(createRegistrationDto);

      // ۲. دریافت مبلغ دوره از Entity
      // فرض می‌کنیم که Course Entity یک فیلد به نام 'price' دارد.
      const amount = registration.course.price;

      // ۳. درخواست پرداخت واقعی از سرویس PaymentService
      const paymentUrl = await this.paymentService.paymentRequest(amount, registration.id);
      console.log('Redirecting user to:', paymentUrl);
      // ۴. بازگرداندن لینک پرداخت به کاربر
      return res.status(HttpStatus.CREATED).json({
        message: 'اطلاعات شما با موفقیت ثبت شد. لطفاً جهت پرداخت اقدام کنید.',
        registrationId: registration.id,
        paymentUrl,
      });

    } catch (error) {
      // مدیریت خطاها
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }
}
