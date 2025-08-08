import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { Response } from 'express';
import { ApiConsumes, ApiCreatedResponse } from '@nestjs/swagger';
import { RegistrationResponseDto } from './dto/registration-response.dto';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes.enum';
import { AuthDecorator } from 'src/common/decorators/Auth.decorator';

@Controller('registration')
@AuthDecorator()
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  async create(
    @Body() createRegistrationDto: CreateRegistrationDto,
    @Res() res: Response,
  ) {
    try {
      const registration = await this.registrationService.createRegistration(createRegistrationDto);
      const paymentUrl = 'https://bpm.shaparak.ir/payment/${result.Return.Token}';
      console.log(paymentUrl);

      const responseBody = {
        message: 'اطلاعات شما با موفقیت ثبت شد. لطفاً جهت پرداخت اقدام کنید.',
        registrationId: registration.id,
        paymentUrl,
      };

      return res.status(HttpStatus.CREATED).json(responseBody);
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistrationDto: UpdateRegistrationDto) {
    return this.registrationService.update(+id, updateRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationService.remove(+id);
  }
}
