import { EntityNames } from "src/common/enums/entity.enum";
import { CourseEntity } from "src/modules/course/entities/course.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Education {
    CYCLE = 'سیکل',
    DIPLOMA = 'دیپلم',
    ASSOCIATE = 'کاردانی',
    BACHELOR = 'لیسانس',
    MASTER = 'فوق لیسانس',
}

export enum MaritalStatus {
    SINGLE = 'مجرد',
    MARRIED = 'متاهل',
}

export enum ExamProfession {
    MINIBUS_DRIVER = '(پايه دو)راننده كاميونت باري',
    TRUCK_DRIVER = '(پايه يك)راننده کامیون باری',
    MINITRUCK_DRIVER = '(پايه دو)راننده مینی بوس مسافری',
    PASSENGER_DRIVER = '(پايه دو)راننده سواري مسافری',
    BUS_DRIVER = '(پايه يك)راننده اتوبوس مسافری',
    PICKUP_TRUCK_DRIVER = '(پايه سه)راننده وانت',
}

export enum ServiceStatus {
    END_OF_SERVICE = 'پایان خدمت',
    EXEMPTION = 'معافیت',
}

export enum PaymentStatus {
    PENDING = 'در انتظار پرداخت',
    SUCCESS = 'پرداخت موفق',
    FAILED = 'پرداخت ناموفق',
}

@Entity(EntityNames.Registration)
export class RegistrationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // مشخصات فردی
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    fatherName: string;

    @Column({ unique: true })
    nationalId: string;

    @Column()
    birthDate: Date; // تاریخ رو می‌تونیم به صورت Date ذخیره کنیم

    @Column()
    birthPlace: string;

    @Column({ type: 'enum', enum: Education })
    education: Education;

    @Column()
    mobileNumber: string;

    @Column({ type: 'enum', enum: MaritalStatus })
    maritalStatus: MaritalStatus;

    // اطلاعات شغلی
    @Column({ type: 'enum', enum: ExamProfession })
    examProfession: ExamProfession;

    @Column()
    licenseNumber: string;

    @Column({ type: 'enum', enum: ServiceStatus })
    serviceStatus: ServiceStatus;

    @Column()
    isLeftHanded: boolean;

    // اطلاعات محل سکونت
    @Column()
    province: string;

    @Column()
    city: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    postalCode: string;

    @Column({ nullable: true })
    landlinePhone: string;

    // محل آزمون
    @Column()
    examProvince: string;

    // وضعیت پرداخت
    @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
    paymentStatus: PaymentStatus;

    // ارتباط با کاربر و دوره
    @ManyToOne(() => UserEntity, (user) => user.registrations)
    user: UserEntity;

    @ManyToOne(() => CourseEntity, (course) => course.registrations)
    course: CourseEntity;

}