import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EventsService } from './events.service';
import {
  PaginatedEventResponse,
  EventResponse,
} from './response/event.response';
import { EventMapper } from './mapper/event.mapper';
import { EventFiltersDto } from './dto/event-filters.dto';

@ApiTags('Events')
@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all events with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved events',
    type: PaginatedEventResponse,
  })
  async findAll(
    @Query() query: EventFiltersDto,
  ): Promise<PaginatedEventResponse> {
    return this.eventsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved event',
    type: EventResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Event not found',
  })
  async findOne(@Param('id') id: number): Promise<EventResponse> {
    const event = await this.eventsService.findOne(id);

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    await this.eventsService.updatePopularityCounter(id);

    return EventMapper.toEventResponse(event);
  }
}
