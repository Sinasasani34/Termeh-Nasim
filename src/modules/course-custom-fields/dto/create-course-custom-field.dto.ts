// src/course-custom-fields/dto/create-course-custom-field.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsIn, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreateCourseCustomFieldDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    courseId: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fieldName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fieldLabel: string;

    @ApiProperty()
    @IsIn(['text', 'number', 'date', 'textarea', 'dropdown'])
    @IsNotEmpty()
    fieldType: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isRequired?: boolean;

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    fieldOptions?: string[];
}