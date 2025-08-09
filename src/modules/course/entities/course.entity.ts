import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { CourseCustomFieldEntity } from "src/modules/course-custom-fields/entities/course-custom-field.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity(EntityNames.Course)
export class CourseEntity extends BaseEntity {
    @Column()
    title: string;

    @Column()
    description?: string;

    @Column({ nullable: true })
    image?: string;

    @Column({ nullable: true })
    syllabus?: string; // طرح درس

    @Column({ nullable: true })
    requirements?: string;

    @Column({ type: 'decimal', default: 0 })
    price: number;

    @Column({ nullable: true, default: true })
    isActive?: boolean;

    @Column()
    categoryId: number;

    @ManyToOne(() => CategoryEntity, category => category.courses)
    @JoinColumn({ name: 'categoryId' })
    category: CategoryEntity;

    @OneToMany(() => CourseCustomFieldEntity, customField => customField.course)
    customFields: CourseCustomFieldEntity[];

}
