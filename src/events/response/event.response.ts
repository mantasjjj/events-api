export class EventResponse {
  id: number;
  title: string;
  popularityCounter: number;
  startTime?: string;
  endTime?: Date;
  timezone?: Date;
  venueName?: string;
  address?: string;
  city?: string;
  lat?: string;
  lng?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  organizerName?: string;
  category?: string;
  ticketUrl?: string;
  free: boolean;
}

export class PaginatedEventResponse {
  data: EventResponse[];
  page: number;
  pageSize: number;
}
