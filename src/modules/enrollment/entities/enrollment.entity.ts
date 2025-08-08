import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { CourseEntity } from "src/modules/course/entities/course.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { YesNoEnum } from "../enums/enums";

@Entity(EntityNames.Enrollments)
export class EnrollmentEntity extends BaseEntity {

    // User Data
    @Column()
    fullName: string;

    @Column()
    fatherName: string;

    @Column()
    idNumber: string;

    @Column()
    nationalCode: string;

    @Column()
    birthDateShamsi: string;

    @Column()
    birthPlace: string;

    @Column({
        type: 'enum',
        enum: ['سیکل', 'دیپلم', 'کاردانی', 'کارشناسی', 'کارشناسی ارشد'],
    })
    educationLevel: string;

    @Column()
    phone: string;

    @Column({
        type: 'enum',
        enum: YesNoEnum
    })
    isMarried: string;

    // job data
    @Column()
    professionTitle: string;

    @Column()
    drivingLicenseNumber: string;

    @Column({
        type: 'enum',
        enum: ['معافیت', 'اتمام خدمت'],
    })
    militaryStatus: string;

    @Column({
        type: 'enum',
        enum: YesNoEnum
    })
    isLeftHanded: string;

    // Address
    @Column()
    residenceProvince: string;

    @Column()
    residenceCity: string;

    @Column({ type: 'text' })
    residenceAddress: string;

    @Column({ nullable: true })
    postalCode?: string;

    @Column({ nullable: true })
    homePhone?: string;

    // exam place
    @Column()
    examProvince: string;

    @CreateDateColumn()
    createdAt: Date;

    // relation

    @ManyToOne(() => UserEntity, (user) => user.enrollments, { eager: true })
    user: UserEntity;

    @ManyToOne(() => CourseEntity, (course) => course.enrollments, { eager: true })
    course: CourseEntity;
}
