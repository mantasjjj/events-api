import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

export interface EventFilters {
  category?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async findAll(filters: EventFilters = {}): Promise<Event[]> {
    const query = this.eventsRepository.createQueryBuilder('event');

    if (filters.category) {
      query.andWhere('event.category = :category', {
        category: filters.category,
      });
    }

    if (filters.location) {
      query.andWhere(
        '(event.city ILIKE :location OR event.address ILIKE :location)',
        {
          location: `%${filters.location}%`,
        },
      );
    }

    if (filters.startDate) {
      query.andWhere('event.startTime >= :startDate', {
        startDate: filters.startDate,
      });
    }

    if (filters.endDate) {
      query.andWhere('event.endTime <= :endDate', { endDate: filters.endDate });
    }

    if (filters.isActive !== undefined) {
      query.andWhere('event.free = :isActive', {
        isActive: filters.isActive,
      });
    }

    return query.orderBy('event.startTime', 'ASC').getMany();
  }

  async findOne(id: number): Promise<Event> {
    return this.eventsRepository.findOne({ where: { id } });
  }
}
