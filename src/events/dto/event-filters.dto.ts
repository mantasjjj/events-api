import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  IsIn,
  IsArray,
} from 'class-validator';

export class EventFiltersDto {
  @ApiProperty({ description: 'Filter by category', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description:
      'Filter by locations (cities or addresses). Can be a single string or comma-separated values.',
    required: false,
    example: 'Vilnius,Kaunas',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((loc) => loc.trim())
        .filter((loc) => loc.length > 0);
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  location?: string[];

  @ApiProperty({ description: 'Filter by start date', required: false })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiProperty({ description: 'Filter by end date', required: false })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiProperty({ description: 'Filter by price from minimum', required: false })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  priceFrom?: number;

  @ApiProperty({ description: 'Filter by price to maximum', required: false })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  priceTo?: number;

  @ApiProperty({ description: 'Filter by active status', required: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Filter for free events (no ticket info)',
    required: false,
  })
  @IsOptional()
  @IsString()
  free?: string;

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

  @ApiProperty({
    description: 'Order direction',
    required: false,
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  orderDirection?: 'ASC' | 'DESC';

  @ApiProperty({ description: 'Hide expired events', required: false })
  @IsOptional()
  @IsString()
  hideExpired?: string;
}
