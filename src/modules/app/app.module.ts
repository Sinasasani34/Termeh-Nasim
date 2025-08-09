import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TypeOrmConfig } from 'src/config/typeorm.config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { CourseModule } from '../course/course.module';
import { ImageModule } from '../image/image.module';
import { CourseCustomFieldsModule } from '../course-custom-fields/course-custom-fields.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env')
    }),
    TypeOrmModule.forRoot(TypeOrmConfig()),
    AuthModule,
    UserModule,
    CategoryModule,
    CourseModule,
    ImageModule,
    CourseCustomFieldsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
