import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseCustomFieldsService } from './course-custom-fields.service';
import { CreateCourseCustomFieldDto } from './dto/create-course-custom-field.dto';
import { UpdateCourseCustomFieldDto } from './dto/update-course-custom-field.dto';

@Controller('course-custom-fields')
export class CourseCustomFieldsController {
  constructor(private readonly courseCustomFieldsService: CourseCustomFieldsService) {}

  @Post()
  create(@Body() createCourseCustomFieldDto: CreateCourseCustomFieldDto) {
    return this.courseCustomFieldsService.create(createCourseCustomFieldDto);
  }

  @Get()
  findAll() {
    return this.courseCustomFieldsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseCustomFieldsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseCustomFieldDto: UpdateCourseCustomFieldDto) {
    return this.courseCustomFieldsService.update(+id, updateCourseCustomFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseCustomFieldsService.remove(+id);
  }
}
