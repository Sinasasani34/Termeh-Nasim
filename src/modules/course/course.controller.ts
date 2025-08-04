import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, FilterCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes.enum';
import { AuthDecorator } from 'src/common/decorators/Auth.decorator';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { FilterCourse } from 'src/common/decorators/filter.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('course')
@ApiTags('Course')
@AuthDecorator()
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post('/')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get("/")
  @SkipAuth()
  @Pagination()
  @FilterCourse()
  findAll(@Query() paginationDto: PaginationDto, @Query() filterDto: FilterCourseDto) {
    return this.courseService.courseList(paginationDto, filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
