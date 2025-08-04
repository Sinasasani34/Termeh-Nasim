import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([CourseEntity, CategoryEntity])],
  controllers: [CourseController],
  providers: [CourseService, CategoryService],
})
export class CourseModule { }
