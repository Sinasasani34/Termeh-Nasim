import { Module } from '@nestjs/common';
import { CourseCustomFieldsService } from './course-custom-fields.service';
import { CourseCustomFieldsController } from './course-custom-fields.controller';

@Module({
  controllers: [CourseCustomFieldsController],
  providers: [CourseCustomFieldsService],
})
export class CourseCustomFieldsModule {}
