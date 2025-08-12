import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCourseDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    slug: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    categories: string[] | string;

    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    duration: string;

    @ApiProperty()
    @IsNotEmpty()
    level: string;

    @ApiProperty()
    @IsNotEmpty()
    language: string;

    @ApiPropertyOptional()
    instructor: string;

    @ApiPropertyOptional()
    image: string;

    @ApiPropertyOptional()
    videoPreviewUrl: string;

    @ApiProperty()
    @IsNotEmpty()
    status: string;

    @ApiProperty()
    @IsNotEmpty()
    certificate: string;
}

export class FilterCourseDto {
    category: string;
    search: string;
}