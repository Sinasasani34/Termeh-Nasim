import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentStatus, RegistrationEntity } from './entities/registration.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CourseEntity } from '../course/entities/course.entity';
import { BadRequestMessage, NotFoundMessage } from 'src/common/enums/message.enum';
import { PublicMessage } from 'src/common/enums/message';

@Injectable()
export class RegistrationService {

  constructor(
    @InjectRepository(RegistrationEntity) private registrationRepository: Repository<RegistrationEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(CourseEntity) private courseRepository: Repository<CourseEntity>,
  ) { }

  async createRegistration(createRegistrationDto: CreateRegistrationDto) {
    const {
      userId,
      courseId,
      birthDate,
      isLeftHanded,
      firstName,
      lastName,
      fatherName,
      nationalId,
      birthPlace,
      education,
      mobileNumber,
      maritalStatus,
      examProfession,
      licenseNumber,
      serviceStatus,
      province,
      city,
      address,
      postalCode,
      landlinePhone,
      examProvince
    } = createRegistrationDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(NotFoundMessage.NotFoundUser);
    }

    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException(NotFoundMessage.NotFoundCourse);
    }

    const existingRegistration = await this.registrationRepository.findOne({
      where: {
        user: { id: user.id },
        course: { id: course.id }
      }
    });
    if (existingRegistration) {
      throw new BadRequestException(BadRequestMessage.AlreadyRegisterd);
    }

    const newRegistration = this.registrationRepository.create({
      firstName,
      lastName,
      fatherName,
      nationalId,
      birthDate: new Date(birthDate),
      birthPlace,
      education,
      mobileNumber,
      maritalStatus,
      examProfession,
      licenseNumber,
      serviceStatus,
      isLeftHanded: Boolean(isLeftHanded),
      province,
      city,
      address,
      postalCode,
      landlinePhone,
      examProvince,
      user,
      course,
      paymentStatus: PaymentStatus.PENDING,
    });

    const savedRegistration = await this.registrationRepository.save(newRegistration);
    return savedRegistration
  }

  async updatePaymentStatus(registrationId: number, status: PaymentStatus) {
    const registration = await this.registrationRepository.findOne({ where: { id: registrationId } });
    if (!registration) {
      throw new NotFoundException('ثبت‌نام مورد نظر یافت نشد.');
    }
    registration.paymentStatus = status;
    return this.registrationRepository.save(registration);
  }

  async getSuccessfulRegistrations() {
    return this.registrationRepository.find({
      where: { paymentStatus: PaymentStatus.SUCCESS },
      relations: ['user', 'course'],
    });
  }

  findAll() {
    return `This action returns all registration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
