import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateCourseDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(10, 100)
    title: string;

    @ApiProperty()
    @Length(10, 300)
    description?: string;

    @ApiPropertyOptional()
    image?: string;

    @ApiProperty()
    @Length(10, 100)
    syllabus?: string;

    @ApiProperty()
    @Length(10, 100)
    requirements?: string;

    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    isActive?: boolean;

    @ApiProperty()
    @IsNotEmpty()
    categoryId: number;
}

export class UpdateBlogDto extends PartialType(CreateCourseDto) { }

export class FilterCourseDto {
    category: string;
    search: string;
}