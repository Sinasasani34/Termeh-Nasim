import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { Column, Entity } from "typeorm";
import { EducationEnum } from "../enums/edu.enum";
import { MaritalStatus } from "../enums/marital-status.enum";
import { ProfessionOfExam } from "../enums/profession-of-exam";
import { LeftHandOrNot, MilitaryStatus } from "../enums/public.enum";
import { ProvienceEnum } from "../enums/provience.enum";

@Entity(EntityNames.SmartCard)
export class SmartCard extends BaseEntity {
    // Personal info
    @Column()
    fullName: string;

    @Column()
    fotherName: string;

    @Column()
    brithCertificateNumber: number; // شماره شناسنامه

    @Column()
    nationalCode: number; // کد ملی

    @Column()
    brithDay: string;

    @Column()
    placeOfBoarn: string;

    @Column({ type: 'enum', enum: EducationEnum, default: EducationEnum.Cycle })
    Education: string;

    @Column()
    mobile: string;

    @Column({ type: 'enum', enum: MaritalStatus })
    maritalStatus: string;

    // job info
    @Column({ type: 'enum', enum: ProfessionOfExam, default: ProfessionOfExam.miniTruckDriver })
    professionOfExam: string; // انتخاب حرفه آزمون

    @Column()
    driveingLicenseNumber: number; // شماره گواهینامه

    @Column({ type: 'enum', enum: MilitaryStatus })
    militaryStatus: string;

    @Column({ type: 'enum', enum: LeftHandOrNot, default: LeftHandOrNot.No })
    isLeftHand: string;

    // Address Info
    @Column({ type: 'enum', enum: ProvienceEnum, default: ProvienceEnum.EastAzarbayjan })
    provience: string;

    @Column()
    city: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    zipCode: number;

    @Column({ nullable: true })
    HomeTel: number;

    // Exam Place
    @Column()
    examPlace: string;
}