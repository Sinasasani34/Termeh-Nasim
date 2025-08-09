import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CourseCustomFieldsService } from './course-custom-fields.service';
import { CreateCourseCustomFieldDto } from './dto/create-course-custom-field.dto';
import { UpdateCourseCustomFieldDto } from './dto/update-course-custom-field.dto';
import { AuthDecorator } from 'src/common/decorators/Auth.decorator';
import { CanAccess } from 'src/common/decorators/role.decorator';
import { Roles } from 'src/common/enums/role.enum';
import { SaveEnrollmentDataDto } from './dto/save-enrollment-data.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes.enum';

@Controller('courses/:courseId/custom-fields')
@AuthDecorator()
export class CourseCustomFieldsController {
  constructor(private readonly customFieldsService: CourseCustomFieldsService) { }

  @CanAccess(Roles.Admin)
  @Post()
  async createCustomField(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() createCustomFieldDto: CreateCourseCustomFieldDto
  ) {
    createCustomFieldDto.courseId = courseId;
    return this.customFieldsService.createCustomField(createCustomFieldDto);
  }

  @Get()
  async getCustomFields(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.customFieldsService.getFieldsForCourse(courseId);
  }

  @Post('enrollment-data')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  async saveEnrollmentData(
    @Body() saveEnrollmentDataDto: SaveEnrollmentDataDto
  ) {
    return this.customFieldsService.saveUserEnrollmentData(saveEnrollmentDataDto);
  }
}