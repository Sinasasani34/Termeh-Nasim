import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { CourseEntity } from "./course.entity";
import { CategoryEntity } from "src/modules/category/entities/category.entity";

@Entity(EntityNames.CourseCategory)
export class CourseCategoryEntity extends BaseEntity {
    @Column()
    courseId: number;

    @Column()
    categoryId: number;

    // Relations

    @ManyToOne(() => CourseEntity, course => course.categories)
    course: CourseEntity;

    @ManyToOne(() => CategoryEntity, category => category.course_categories, { onDelete: 'CASCADE' })
    category: CategoryEntity;
}