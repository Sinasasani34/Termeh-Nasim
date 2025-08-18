import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber } from "class-validator";
import { EducationEnum } from "../enums/edu.enum";
import { MaritalStatus } from "../enums/marital-status.enum";
import { ProfessionOfExam } from "../enums/profession-of-exam";
import { LeftHandOrNot, MilitaryStatus } from "../enums/public.enum";
import { ProvienceEnum } from "../enums/provience.enum";
import { PlaceOfExam } from "../enums/exam-place.enum";

export class CreateSmartCardDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    fotherName: string;

    @ApiProperty()
    @IsNumber()
    brithCertificateNumber: number;

    @ApiProperty()
    @IsNumber()
    nationalCode: number;

    @ApiProperty()
    brithDay: string;

    @ApiProperty()
    placeOfBoarn: string;

    @ApiProperty()
    @IsEnum(EducationEnum)
    Education: EducationEnum;

    @ApiProperty()
    @IsNumber()
    mobile: number;

    @ApiProperty()
    @IsEnum(MaritalStatus)
    maritalStatus: MaritalStatus;

    // user job info
    @ApiProperty({ description: 'انتخاب حرفه ازمون' })
    @IsEnum(ProfessionOfExam)
    professionOfExam: ProfessionOfExam;

    @ApiProperty({ description: 'شماره گواهینامه' })
    @IsNumber()
    driveingLicenseNumber: number;

    @ApiProperty({ description: 'شماره شناسنامه' })
    @IsEnum(MilitaryStatus)
    militaryStatus: MilitaryStatus;

    @ApiProperty({ description: 'شماره شناسنامه' })
    @IsEnum(LeftHandOrNot)
    isLeftHand: LeftHandOrNot;

    // Address Info
    @ApiProperty()
    @IsEnum(ProvienceEnum)
    provience: ProvienceEnum;

    @ApiProperty()
    city: string;

    @ApiProperty()
    address: string;

    @ApiPropertyOptional()
    @IsNumber()
    zipCode: number;

    @ApiPropertyOptional()
    @IsNumber()
    HomeTel: number;

    // exam Place
    @ApiProperty()
    @IsEnum(PlaceOfExam)
    examPlace: PlaceOfExam;
}
