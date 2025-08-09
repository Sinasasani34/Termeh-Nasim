import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SaveEnrollmentDataDto {
    @IsNumber()
    @IsNotEmpty()
    enrollmentId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number; // کلید کاربر وارد شده

    @IsNumber()
    @IsNotEmpty()
    courseCustomFieldId: number;

    @IsString()
    @IsNotEmpty()
    value: string;
}