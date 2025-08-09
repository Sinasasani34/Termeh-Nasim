import { Module } from '@nestjs/common';
import { CourseCustomFieldsService } from './course-custom-fields.service';
import { CourseCustomFieldsController } from './course-custom-fields.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseCustomFieldEntity } from './entities/course-custom-field.entity';
import { UserCourseEnrollmentDataEntity } from './entities/user-course-enrollment-data.entity';
import { CourseEntity } from '../course/entities/course.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      CourseCustomFieldEntity,
      UserCourseEnrollmentDataEntity,
      CourseEntity
    ])
  ],
  controllers: [CourseCustomFieldsController],
  providers: [CourseCustomFieldsService],
})
export class CourseCustomFieldsModule { }
