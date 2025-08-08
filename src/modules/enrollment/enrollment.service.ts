import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from '../course/entities/course.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { PublicMessage } from 'src/common/enums/message';

@Injectable()
export class EnrollmentService {

  constructor(
    @InjectRepository(CourseEntity) private courseRepository: Repository<CourseEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(EnrollmentEntity) private enrollmentRepository: Repository<EnrollmentEntity>,
  ) { }

  async create(userId: number, createEnrollmentDto: CreateEnrollmentDto) {
    const course = await this.courseRepository.findOneBy({ id: createEnrollmentDto.courseId });
    if (!course) throw new NotFoundException('دوره موردنظر یافت نشد');

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('کاربر یافت نشد');

    const enrollment = this.enrollmentRepository.create({
      ...createEnrollmentDto,
      isLeftHanded: createEnrollmentDto.isLeftHanded === 'بله' ? 'yes' : 'no',
      isMarried: createEnrollmentDto.isMarried === 'متاهل' ? 'yes' : 'no',
      course,
      user,
    });

    await this.enrollmentRepository.save(enrollment);

    return {
      message: PublicMessage.Created
    }
  }

  findAll() {
    return `This action returns all enrollment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enrollment`;
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}
