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
      query.andWhere('event.location ILIKE :location', {
        location: `%${filters.location}%`,
      });
    }

    if (filters.startDate) {
      query.andWhere('event.startDate >= :startDate', {
        startDate: filters.startDate,
      });
    }

    if (filters.endDate) {
      query.andWhere('event.endDate <= :endDate', { endDate: filters.endDate });
    }

    if (filters.isActive !== undefined) {
      query.andWhere('event.isActive = :isActive', {
        isActive: filters.isActive,
      });
    }

    return query.orderBy('event.startDate', 'ASC').getMany();
  }

  async findOne(id: number): Promise<Event> {
    return this.eventsRepository.findOne({ where: { id } });
  }
}
