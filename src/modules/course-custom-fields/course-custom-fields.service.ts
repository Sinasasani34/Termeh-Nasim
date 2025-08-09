import { Injectable } from '@nestjs/common';
import { CreateCourseCustomFieldDto } from './dto/create-course-custom-field.dto';
import { UpdateCourseCustomFieldDto } from './dto/update-course-custom-field.dto';

@Injectable()
export class CourseCustomFieldsService {
  create(createCourseCustomFieldDto: CreateCourseCustomFieldDto) {
    return 'This action adds a new courseCustomField';
  }

  findAll() {
    return `This action returns all courseCustomFields`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseCustomField`;
  }

  update(id: number, updateCourseCustomFieldDto: UpdateCourseCustomFieldDto) {
    return `This action updates a #${id} courseCustomField`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseCustomField`;
  }
}
