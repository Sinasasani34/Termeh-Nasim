import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateCourseDto, FilterCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
import { isArray } from 'class-validator';
import { BadRequestMessage } from 'src/common/enums/message.enum';
import { createSlug, randomId } from 'src/common/utils/functions.util';
import { CategoryService } from '../category/category.service';
import { CourseCategoryEntity } from './entities/course-category.entity';
import { PublicMessage } from 'src/common/enums/message';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RequestUser } from '../user/interface/Request.User';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { paginationGenerator, paginationSolver } from 'src/common/utils/pagination.util';
import { EntityNames } from 'src/common/enums/entity.enum';

@Injectable({ scope: Scope.REQUEST })
export class CourseService {

  constructor(
    @InjectRepository(CourseEntity) private courseRepository: Repository<CourseEntity>,
    @InjectRepository(CourseCategoryEntity) private courseCategoryRepository: Repository<CourseCategoryEntity>,
    @Inject(REQUEST) private request: Request,
    private categoryService: CategoryService,
  ) { }

  async create(courseDto: CreateCourseDto) {
    let { title, slug, description, categories, price, duration, level, language, instructor, image, videoPreviewUrl, status, certificate } = courseDto;

    if (!isArray(categories) && typeof categories === 'string') {
      categories = categories.split(',');
    } else if (!isArray(categories)) {
      throw new BadRequestException(BadRequestMessage.InvalidCategories);
    }

    let slugData = slug ?? title;
    slug = createSlug(slugData);
    const isExist = await this.checkCourseBySlug(slug);
    if (isExist) {
      slug += `-${randomId()}`;
    }

    let course = this.courseRepository.create({
      title,
      slug,
      description,
      price,
      duration,
      level,
      language,
      instructor,
      image,
      videoPreviewUrl,
      status,
      certificate
    });
    course = await this.courseRepository.save(course);

    for (const categoryTitle of categories) {
      let category = await this.categoryService.findOneByTitle(categoryTitle);
      if (!category) {
        category = await this.categoryService.insertByTitle(categoryTitle);
      }
      await this.courseCategoryRepository.insert({
        courseId: course.id,
        categoryId: category.id
      })
    }
    return {
      message: PublicMessage.Created
    }
  }

  async checkCourseBySlug(slug: string) {
    const course = await this.courseRepository.findOneBy({ slug });
    return course;
  }

  async checkCourseById(id: number) {
    const course = await this.courseRepository.findOneBy({ id });
    return course;
  }

  async myCourses() {
    const { id } = this.request.user as RequestUser;
    this.courseRepository.find({
      where: {
        // enrollments
      },
      order: {
        id: 'DESC'
      }
    })
  }

  async courseList(paginationDto: PaginationDto, filterDto: FilterCourseDto) {
    const { limit, page, skip } = paginationSolver(paginationDto);
    let { category, search } = filterDto;
    let where = '';
    if (category) {
      category = category.toLowerCase();
      if (where.length > 0) where += ' AND ';
      where += 'category.title = LOWER(:category)';
    }
    if (search) {
      if (where.length > 0) where += ' AND ';
      search = `%${search}%`;
      where += 'CONCAT(course.title, course.description) ILIKE :search';
    }

    const [courses, count] = await this.courseRepository.createQueryBuilder(EntityNames.Course)
      .leftJoin('course.categories', 'categories')
      .leftJoin('categories.category', 'category')
      .addSelect(['categories.id', 'category.title'])
      .where(where, { category, search })
      .orderBy('course.id', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      pagination: paginationGenerator(count, page, limit),
      courses
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  async update(id: any, courseDto: UpdateCourseDto) {
    let { title, slug, description, categories, price, duration, level, language, instructor, image, videoPreviewUrl, status, certificate } = courseDto;

    const course = await this.checkCourseById(id);
    if (!course) {
      throw new NotFoundException('دوره مورد نظر یافت نشد')
    }
    if (!isArray(categories) && typeof categories === 'string') {
      categories = categories.split(',');
    } else if (!isArray(categories)) {
      throw new BadRequestException(BadRequestMessage.InvalidCategories);
    }

    let slugData: string | null = null;
    if (title) {
      slugData = title;
      course.title = title;
    }
    if (slug) {
      slugData = slug;
    }
    if (slugData) {
      slug = createSlug(slugData);
      const isExist = await this.checkCourseBySlug(slug);
      if (isExist && isExist.id !== id) {
        slug += `-${randomId()}`;
      }
      course.slug = slug;
    }
    if (description) course.description = description;
    if (price) course.price = price;
    if (image) course.image = image;
    if (videoPreviewUrl) course.videoPreviewUrl = videoPreviewUrl;
    if (duration) course.duration = duration;
    if (level) course.level = level;
    if (language) course.language = language;
    if (instructor) course.instructor = instructor;
    if (status) course.status = status;
    if (certificate) course.certificate = certificate;
    await this.courseRepository.save(course);
    if (categories && isArray(categories) && categories.length > 0) {
      await this.courseCategoryRepository.delete({ courseId: course.id });
    }

    for (const categoryTitle of categories) {
      let category = await this.categoryService.findOneByTitle(categoryTitle);
      if (!category) {
        category = await this.categoryService.insertByTitle(categoryTitle);
      }
      await this.courseCategoryRepository.insert({
        courseId: course.id,
        categoryId: category.id
      })
    }
    return {
      message: PublicMessage.Updated
    }
  }

  async remove(id: number) {
    await this.checkCourseById(id);
    await this.courseCategoryRepository.delete({ course: { id } });
    const result = await this.courseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return {
      message: PublicMessage.Deleted
    }
  }
}
