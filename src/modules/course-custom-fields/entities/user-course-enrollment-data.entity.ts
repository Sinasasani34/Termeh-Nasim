import { BaseEntity } from "src/common/abstracts/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { CourseCustomFieldEntity } from "./course-custom-field.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

@Entity("user_course_enrollment_data")
export class UserCourseEnrollmentDataEntity extends BaseEntity {
    @Column()
    enrollmentId: number; // کلید خارجی به جدول ثبت‌نام اصلی کاربر

    @Column()
    userId: number;

    @Column()
    courseCustomFieldId: number;

    @Column()
    value: string;

    // رابطه با جدول CourseCustomField
    @ManyToOne(() => CourseCustomFieldEntity, customField => customField.enrollmentData, { onDelete: 'CASCADE' })
    customField: CourseCustomFieldEntity;

    @ManyToOne(() => UserEntity, user => user.enrollmentData, { onDelete: 'CASCADE' })
    user: UserEntity;
}