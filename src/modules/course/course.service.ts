import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto, FilterCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PublicMessage } from 'src/common/enums/message';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { Repository } from 'typeorm';
import { NotFoundMessage } from 'src/common/enums/message.enum';
import { CategoryEntity } from '../category/entities/category.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { paginationGenerator, paginationSolver } from 'src/common/utils/pagination.util';
import { EntityNames } from 'src/common/enums/entity.enum';

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

  // async courseList(paginationDto: PaginationDto, filterDto: FilterCourseDto) {
  //   const { limit, page, skip } = paginationSolver(paginationDto);
  //   let { category, search } = filterDto;
  //   let where = '';
  //   if (category) {
  //     category = category.toLowerCase();
  //     if (where.length > 0) where += ' AND ';
  //     where += `category.title = LOWER(:category)`;
  //   }
  //   if (search) {
  //     if (where.length > 0) where += ' AND ';
  //     search = `%${search}%`;
  //     where += `CONCAT(course.title, course.description) ILIKE :search`
  //   }

  //   const [courses, count] = await this.courseRepository.createQueryBuilder(EntityNames.Course)
  //     .leftJoin("course.category", "category")
  //     // .leftJoin("categories.category", "category")
  //     .addSelect(['category.title', 'course.price', 'course.title'])
  //     .where(where, { category, search })
  //     .orderBy("course.id", 'DESC')
  //     .skip(skip)
  //     .take(limit)
  //     .getManyAndCount();
  //   return {
  //     pagination: paginationGenerator(count, page, limit),
  //     courses
  //   }
  // }

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

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
