import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseCustomFieldDto {
    @IsNumber()
    @IsNotEmpty()
    courseId: number;

    @IsString()
    @IsNotEmpty()
    fieldName: string;

    @IsString()
    @IsNotEmpty()
    fieldLabel: string;

    @IsIn(['text', 'number', 'date', 'textarea', 'dropdown'])
    @IsNotEmpty()
    fieldType: string;

    @IsBoolean()
    @IsOptional()
    isRequired?: boolean;

    @IsArray()
    @IsOptional()
    fieldOptions?: string[];
}
