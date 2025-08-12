import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { CourseCategoryEntity } from "src/modules/course/entities/course-category.entity";
import { CourseEntity } from "src/modules/course/entities/course.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity(EntityNames.Category)
export class CategoryEntity extends BaseEntity {
    @Column()
    title: string;

    @Column({ nullable: true })
    priority: number;

    @OneToMany(() => CourseCategoryEntity, course => course.category)
    course_categories: CourseCategoryEntity[];
}