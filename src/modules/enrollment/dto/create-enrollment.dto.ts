import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUUID } from "class-validator";

export class CreateEnrollmentDto {
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    courseId: number;

    // user data
    @IsString()
    fullName: string;

    @IsString()
    fatherName: string;

    @IsString()
    idNumber: string;

    @IsString()
    nationalCode: string;

    @IsString()
    birthDateShamsi: string;

    @IsString()
    birthPlace: string;

    @IsEnum(['سیکل', 'دیپلم', 'کاردانی', 'کارشناسی', 'کارشناسی ارشد'])
    educationLevel: string;

    @IsPhoneNumber('IR')
    phone: string;

    @IsEnum(['مجرد', 'متاهل'])
    isMarried: string;

    // job data
    @IsString()
    professionTitle: string;

    @IsString()
    drivingLicenseNumber: string;

    @IsEnum(['معافیت', 'اتمام خدمت'])
    militaryStatus: string;

    @IsEnum(['بله', 'خير'])
    isLeftHanded: string;

    // address
    @IsString()
    residenceProvince: string;

    @IsString()
    residenceCity: string;

    @IsString()
    residenceAddress: string;

    @IsOptional()
    @IsString()
    postalCode?: string;

    @IsOptional()
    @IsString()
    homePhone?: string;

    // exam place
    @IsString()
    examProvince: string;
}
