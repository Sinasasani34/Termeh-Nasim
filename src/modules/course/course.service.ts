import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto, FilterCourseDto, UpdateCourseDto } from './dto/create-course.dto';
import { PublicMessage } from 'src/common/enums/message';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { Repository } from 'typeorm';
import { NotFoundMessage } from 'src/common/enums/message.enum';
import { CategoryEntity } from '../category/entities/category.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { paginationGenerator, paginationSolver } from 'src/common/utils/pagination.util';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity) private courseRepository: Repository<CourseEntity>,
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
  ) { }
  async create(createCourseDto: CreateCourseDto) {
    const { title, description, image, syllabus, requirements, price, isActive, categoryId } = createCourseDto;
    const category = await this.checkExistCourseById(categoryId);
    const course = this.courseRepository.create({
      title,
      description,
      image,
      syllabus,
      requirements,
      price,
      isActive: isActive ?? true,
      category
    });

    await this.courseRepository.save(course);
    return {
      message: PublicMessage.Created
    }
  }

  async checkExistCourseById(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(NotFoundMessage.NotFoundCategory);
    }
    return category;
  }

  async courseList(paginationDto: PaginationDto, filterDto: FilterCourseDto) {
    const { limit, page, skip } = paginationSolver(paginationDto);
    const { category, search } = filterDto;

    const query = this.courseRepository.createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category')
      .orderBy('course.id', 'DESC')
      .skip(skip)
      .take(limit);

    if (category && search) {
      query.andWhere(
        `(LOWER(category.title) = LOWER(:category) AND (course.title ILIKE :search OR course.description ILIKE :search))`,
        { category, search: `%${search}%` },
      );
    } else if (category) {
      query.andWhere(`LOWER(category.title) = LOWER(:category)`, { category });
    } else if (search) {
      query.andWhere(`course.title ILIKE :search OR course.description ILIKE :search`, {
        search: `%${search}%`,
      });
    }

    const [courses, count] = await query.getManyAndCount();

    return {
      pagination: paginationGenerator(count, page, limit),
      courses,
    };
  }

  async findOneById(id: number) {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException(NotFoundMessage.NotFoundCourse);
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException('دوره مورد نظر پیدا نشد');
    }

    if (updateCourseDto.categoryId && updateCourseDto.categoryId !== course.category?.id) {
      const category = await this.categoryRepository.findOne({ where: { id: updateCourseDto.categoryId } });
      if (!category) {
        throw new BadRequestException('دسته‌بندی وارد شده معتبر نیست');
      }
      course.category = category;
    }

    if (updateCourseDto.title !== undefined) course.title = updateCourseDto.title;
    if (updateCourseDto.description !== undefined) course.description = updateCourseDto.description;
    if (updateCourseDto.image !== undefined) course.image = updateCourseDto.image;
    if (updateCourseDto.syllabus !== undefined) course.syllabus = updateCourseDto.syllabus;
    if (updateCourseDto.requirements !== undefined) course.requirements = updateCourseDto.requirements;
    if (updateCourseDto.price !== undefined) course.price = updateCourseDto.price;
    if (updateCourseDto.isActive !== undefined) course.isActive = updateCourseDto.isActive;

    await this.courseRepository.save(course);
    return {
      message: PublicMessage.Updated
    }
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException(NotFoundMessage.NotFoundCourse);
    }
    await this.courseRepository.delete({ id });
    return {
      message: PublicMessage.Deleted
    }
  }
}
