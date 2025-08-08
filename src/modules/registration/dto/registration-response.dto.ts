import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class RegistrationResponseDto {
    @ApiProperty({ example: 1, description: 'شناسه ثبت‌نام' })
    registrationId: number;

    @ApiProperty({
        example: 'اطلاعات شما با موفقیت ثبت شد. لطفاً جهت پرداخت اقدام کنید.',
        description: 'پیام پاسخ',
    })
    message: string;

    @ApiProperty({
        example: 'https://payment-gateway.com/pay',
        description: 'لینک پرداخت',
    })
    paymentUrl: string;
}