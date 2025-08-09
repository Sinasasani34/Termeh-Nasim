import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseCustomFieldDto } from './create-course-custom-field.dto';

export class UpdateCourseCustomFieldDto extends PartialType(CreateCourseCustomFieldDto) {}
