import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseCustomFieldDto } from './dto/create-course-custom-field.dto';
import { UpdateCourseCustomFieldDto } from './dto/update-course-custom-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseCustomFieldEntity } from './entities/course-custom-field.entity';
import { Repository } from 'typeorm';
import { UserCourseEnrollmentDataEntity } from './entities/user-course-enrollment-data.entity';
import { SaveEnrollmentDataDto } from './dto/save-enrollment-data.dto';
import { CourseEntity } from '../course/entities/course.entity';

@Injectable()
export class CourseCustomFieldsService {
  constructor(
    @InjectRepository(CourseCustomFieldEntity)
    private customFieldsRepository: Repository<CourseCustomFieldEntity>,
    @InjectRepository(UserCourseEnrollmentDataEntity)
    private enrollmentDataRepository: Repository<UserCourseEnrollmentDataEntity>,
    @InjectRepository(CourseEntity) // تزریق Repository دوره
    private coursesRepository: Repository<CourseEntity>,
  ) { }

  async createCustomField(createCustomFieldDto: CreateCourseCustomFieldDto) {
    const course = await this.coursesRepository.findOne({
      where: { id: createCustomFieldDto.courseId }
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${createCustomFieldDto.courseId} not found`);
    }

    const newField = new CourseCustomFieldEntity();

    newField.fieldName = createCustomFieldDto.fieldName;
    newField.fieldLabel = createCustomFieldDto.fieldLabel;
    newField.fieldType = createCustomFieldDto.fieldType as 'text' | 'number' | 'date' | 'textarea' | 'dropdown';
    newField.isRequired = createCustomFieldDto.isRequired ?? false;
    newField.fieldOptions = createCustomFieldDto.fieldOptions ?? [];
    newField.course = course;
    return this.customFieldsRepository.save(newField);
  }


  async getFieldsForCourse(courseId: number) {
    return this.customFieldsRepository.find({ where: { courseId } });
  }

  async saveUserEnrollmentData(saveEnrollmentDataDto: SaveEnrollmentDataDto) {
    const fieldExists = await this.customFieldsRepository.findOne({
      where: { id: saveEnrollmentDataDto.courseCustomFieldId }
    });

    if (!fieldExists) {
      throw new NotFoundException('Custom field not found');
    }

    const enrollmentData = this.enrollmentDataRepository.create(saveEnrollmentDataDto);
    return this.enrollmentDataRepository.save(enrollmentData);
  }

  // متدهای دیگر مثل update و delete
}
