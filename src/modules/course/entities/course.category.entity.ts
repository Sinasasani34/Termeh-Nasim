import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity(EntityNames.CourseCategory)
export class CourseCategoryEntity extends BaseEntity {
    @Column()
    courseId: number;

    @Column()
    categoryId: number;

    @ManyToOne(() => CategoryEntity, category => category.course_categories)
    category: CategoryEntity;
}