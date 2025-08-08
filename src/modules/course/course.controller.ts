import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, FilterCourseDto, UpdateCourseDto } from './dto/create-course.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes.enum';
import { AuthDecorator } from 'src/common/decorators/Auth.decorator';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { FilterCourse } from 'src/common/decorators/filter.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CanAccess } from 'src/common/decorators/role.decorator';
import { Roles } from 'src/common/enums/role.enum';

@Controller('course')
@ApiTags('Course')
@AuthDecorator()
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post('/')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  @CanAccess(Roles.Admin)
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
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.courseService.findOneById(+id);
  }

  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  @CanAccess(Roles.Admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @CanAccess(Roles.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.remove(id);
  }
}
