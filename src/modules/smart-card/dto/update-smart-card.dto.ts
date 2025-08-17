import { PartialType } from '@nestjs/mapped-types';
import { CreateSmartCardDto } from './create-smart-card.dto';

export class UpdateSmartCardDto extends PartialType(CreateSmartCardDto) {}
