import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from "typeorm";
import { CourseLevel } from "../enums/courseLevel.enum";
import { CourseLang } from "../enums/course.language";
import { CourseStatus } from "../enums/status.enum";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { CourseCategoryEntity } from "./course-category.entity";

@Entity(EntityNames.Course)
export class CourseEntity extends BaseEntity {
    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    categoryId: number;

    @Column()
    price: number;

    @Column()
    duration: string; // time of course

    @Column({ type: 'enum', enum: CourseLevel, default: CourseLevel.Beginner })
    level: string; // سطح دوره

    @Column({ type: 'enum', enum: CourseLang, default: CourseLang.Persion })
    language: string;

    @Column({ nullable: true })
    instructor: string; // teacher of course

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    videoPreviewUrl: string;

    @Column({ type: 'enum', enum: CourseStatus, default: CourseStatus.IsActive })
    status: string;

    @Column()
    certificate: string;

    @CreateDateColumn()
    createdAt: Date;

    // relations
    @OneToMany(() => CourseCategoryEntity, category => category.course)
    categories: CourseCategoryEntity[];
}
