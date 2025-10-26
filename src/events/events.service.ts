import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entity/event.entity';
import { PaginatedEventResponse } from './response/event.response';
import { EventMapper } from './mapper/event.mapper';

export interface EventFilters {
  category?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
  orderBy?: 'startTime' | 'popularityCounter' | 'price';
  hideExpired?: boolean;
}

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async findAll(filters: EventFilters = {}): Promise<PaginatedEventResponse> {
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const skip = (page - 1) * pageSize;

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

    if (filters.search) {
      query.andWhere('event.title ILIKE :search', {
        search: `%${filters.search}%`,
      });
    }

    // todo: Add these once we have correct startTime data
    // if (filters.hideExpired !== false) {
    //   const today = new Date().toISOString().split('T')[0];
    //   query.andWhere('DATE(event.startTime) >= :today', { today });
    // }
    //
    // const orderByColumn = filters.orderBy || 'startTime';
    // const orderByMap = {
    //   startTime: 'event.startTime',
    //   title: 'event.title',
    //   popularityCounter: 'event.popularityCounter',
    //   price: 'event.price',
    // };
    //
    // query.orderBy(orderByMap[orderByColumn], 'DESC');

    const events = await query.skip(skip).take(pageSize).getMany();

    const eventResponses = EventMapper.toEventResponseArray(events);

    return {
      data: eventResponses,
      page,
      pageSize,
    };
  }

  async findOne(id: number): Promise<Event> {
    return this.eventsRepository.findOne({ where: { id } });
  }

  async updatePopularityCounter(id: number): Promise<void> {
    await this.eventsRepository
      .createQueryBuilder()
      .update(Event)
      .set({ popularityCounter: () => 'popularity_counter + 1' })
      .where('id = :id', { id })
      .execute();
  }
}
