import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  IsIn,
} from 'class-validator';

export class EventFiltersDto {
  @ApiProperty({ description: 'Filter by category', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Filter by location (city or address)',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'Filter by start date', required: false })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiProperty({ description: 'Filter by end date', required: false })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiProperty({ description: 'Filter by active status', required: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Search in event titles', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
    default: 1,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    default: 10,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  pageSize?: number;

  @ApiProperty({
    description: 'Order by field',
    required: false,
    enum: ['startTime', 'popularityCounter', 'price'],
  })
  @IsOptional()
  @IsIn(['startTime', 'popularityCounter', 'price'])
  orderBy?: 'startTime' | 'popularityCounter' | 'price';

  @ApiProperty({ description: 'Hide expired events', required: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  hideExpired?: boolean;
}
