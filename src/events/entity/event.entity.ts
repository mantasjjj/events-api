import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({
    name: 'popularity_counter',
    type: 'numeric',
    nullable: false,
    default: 0,
  })
  popularityCounter: number;

  @Column({ name: 'start_time', type: 'text', nullable: true })
  startTime?: string;

  @Column({ name: 'end_time', type: 'timestamp', nullable: true })
  endTime?: Date;

  @Column({ name: 'timezone', type: 'timestamp', nullable: true })
  timezone?: Date;

  @Column({ name: 'venue_name', type: 'text', nullable: true })
  venueName?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'text', nullable: true })
  city?: string;

  @Column({ type: 'text', nullable: true })
  lat?: string;

  @Column({ type: 'text', nullable: true })
  lng?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl?: string;

  @Column({ name: 'price_from', type: 'numeric', nullable: true })
  priceFrom?: number;

  @Column({ name: 'price_to', type: 'numeric', nullable: true })
  priceTo?: number;

  @Column({ name: 'organizer_name', type: 'text', nullable: true })
  organizerName?: string;

  @Column({ type: 'text', nullable: true })
  category?: string;

  @Column({ name: 'ticket_url', type: 'text', nullable: true })
  tickerUrl?: string;

  @Column({ name: 'ticket_purchase_note', type: 'text', nullable: true })
  ticketPurchaseNote?: string;
}
