import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Length, Min } from "class-validator";
import { Education, ExamProfession, MaritalStatus, ServiceStatus } from "../entities/registration.entity";

export class CreateRegistrationDto {
    // فیلدهای ارتباط با User و Course
    // ما فرض می‌کنیم که این فیلدها از طریق درخواست به سرور ارسال می‌شن.
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    @Min(1)
    userId: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    @Min(1)
    courseId: number;

    // بخش مشخصات فردی
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    fatherName: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 10, { message: 'کد ملی باید ۱۰ رقم باشد' })
    nationalId: string;

    @IsString()
    @IsNotEmpty()
    birthDate: string; // تاریخ رو به صورت string می‌گیریم

    @IsString()
    @IsNotEmpty()
    birthPlace: string;

    @IsEnum(Education)
    @IsNotEmpty()
    education: Education;

    @IsString()
    @IsNotEmpty()
    @IsMobilePhone('fa-IR')
    mobileNumber: string;

    @IsEnum(MaritalStatus)
    @IsNotEmpty()
    maritalStatus: MaritalStatus;


    // بخش اطلاعات شغلی
    @IsEnum(ExamProfession)
    @IsNotEmpty()
    examProfession: ExamProfession;

    @IsString()
    @IsNotEmpty()
    licenseNumber: string;

    @IsEnum(ServiceStatus)
    @IsNotEmpty()
    serviceStatus: ServiceStatus;

    // فیلد isLeftHanded رو به صورت boolean و از طریق `class-transformer` هندل می‌کنیم
    @IsBoolean()
    @IsNotEmpty()
    @Type(() => Boolean)
    isLeftHanded: boolean;

    // بخش اطلاعات محل سکونت
    @IsString()
    @IsNotEmpty()
    province: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsOptional()
    @IsString()
    postalCode?: string;

    @IsOptional()
    @IsString()
    landlinePhone?: string;

    // بخش محل آزمون
    @IsString()
    @IsNotEmpty()
    examProvince: string;
}