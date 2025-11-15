import { ApiProperty } from '@nestjs/swagger';

export class EventResponse {
  @ApiProperty({ description: 'Unique identifier for the event' })
  id: number;

  @ApiProperty({ description: 'Event title' })
  title: string;

  @ApiProperty({ description: 'Number of times the event was viewed' })
  popularityCounter: number;

  @ApiProperty({ description: 'Event start time', required: false })
  startTime?: string;

  @ApiProperty({ description: 'Event end time', required: false })
  endTime?: Date;

  @ApiProperty({ description: 'Event timezone', required: false })
  timezone?: Date;

  @ApiProperty({ description: 'Venue name', required: false })
  venueName?: string;

  @ApiProperty({ description: 'Event address', required: false })
  address?: string;

  @ApiProperty({ description: 'Event city', required: false })
  city?: string;

  @ApiProperty({ description: 'Latitude coordinate', required: false })
  lat?: string;

  @ApiProperty({ description: 'Longitude coordinate', required: false })
  lng?: string;

  @ApiProperty({ description: 'Event description', required: false })
  description?: string;

  @ApiProperty({ description: 'Event image URL', required: false })
  imageUrl?: string;

  @ApiProperty({ description: 'Event price from', required: false })
  priceFrom?: number;

  @ApiProperty({ description: 'Event price to', required: false })
  priceTo?: number;

  @ApiProperty({ description: 'Organizer name', required: false })
  organizerName?: string;

  @ApiProperty({ description: 'Event category', required: false })
  category?: string;

  @ApiProperty({ description: 'Ticket purchase URL', required: false })
  ticketUrl?: string;

  @ApiProperty({ description: 'Ticket purchase note', required: false })
  ticketPurchaseNote?: string;

  @ApiProperty({ description: 'Whether the event is free' })
  free: boolean;
}

export class PaginatedEventResponse {
  @ApiProperty({ type: [EventResponse], description: 'Array of events' })
  data: EventResponse[];

  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Number of items per page' })
  pageSize: number;
}
