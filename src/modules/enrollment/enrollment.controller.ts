import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { AuthDecorator } from 'src/common/decorators/Auth.decorator';
import { Request } from 'express';
import { CurrentUser } from 'src/common/decorators/current.user.decorator';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes.enum';

@Controller('enrollment')
@ApiTags('Enrollment')
@AuthDecorator()
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) { }

  @Post("/")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  async create(@CurrentUser('id') userId: number, @Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(userId, createEnrollmentDto);
  }

  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentService.update(+id, updateEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }
}
