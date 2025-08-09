import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { CourseEntity } from "src/modules/course/entities/course.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { UserCourseEnrollmentDataEntity } from "./user-course-enrollment-data.entity";

@Entity(EntityNames.CourseCustomField)
export class CourseCustomFieldEntity extends BaseEntity {
    @Column()
    courseId: number;

    @Column()
    fieldName: string;

    @Column()
    fieldLabel: string;

    @Column()
    fieldType: 'text' | 'number' | 'date' | 'textarea' | 'dropdown';

    @Column({ default: false })
    isRequired: boolean;

    @Column('json', { nullable: true })
    fieldOptions: string[];

    @ManyToOne(() => CourseEntity, course => course.customFields, { onDelete: 'CASCADE' })
    course: CourseEntity;

    @OneToMany(() => UserCourseEnrollmentDataEntity, enrollmentData => enrollmentData.customField, { cascade: true })
    enrollmentData: UserCourseEnrollmentDataEntity[];
}
