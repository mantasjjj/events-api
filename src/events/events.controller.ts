import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { EventsService, EventFilters } from './events.service';
import {
  PaginatedEventResponse,
  EventResponse,
} from './response/event.response';
import { EventMapper } from './mapper/event.mapper';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(@Query() query: EventFilters): Promise<PaginatedEventResponse> {
    return this.eventsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EventResponse> {
    const event = await this.eventsService.findOne(id);

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    await this.eventsService.updatePopularityCounter(id);

    return EventMapper.toEventResponse(event);
  }
}
