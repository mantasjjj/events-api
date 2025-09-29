import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { EventsService, EventFilters } from './events.service';
import { Event } from './event.entity';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(@Query() query: EventFilters): Promise<Event[]> {
    return this.eventsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Event> {
    const event = await this.eventsService.findOne(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }
}
