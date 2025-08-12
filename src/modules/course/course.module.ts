import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { AddUserToReqWOV } from 'src/common/middleware/addUserToRequestWOV.middleware';
import { CourseCategoryEntity } from './entities/course-category.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CourseEntity, CategoryEntity, CourseCategoryEntity])
  ],
  controllers: [CourseController],
  providers: [CourseService, CategoryService],
})
export class CourseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddUserToReqWOV).forRoutes('course/by-slug/:slug');
  }
}
