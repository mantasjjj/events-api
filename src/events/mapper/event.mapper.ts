import { Event } from '../entity/event.entity';
import { EventResponse } from '../response/event.response';

export class EventMapper {
  static toEventResponse(event: Event): EventResponse {
    const eventResponse = new EventResponse();
    eventResponse.id = event.id;
    eventResponse.title = event.title;
    eventResponse.popularityCounter = event.popularityCounter;
    eventResponse.startTime = event.startTime;
    eventResponse.endTime = event.endTime;
    eventResponse.timezone = event.timezone;
    eventResponse.venueName = event.venueName;
    eventResponse.address = event.address;
    eventResponse.city = event.city;
    eventResponse.lat = event.lat;
    eventResponse.lng = event.lng;
    eventResponse.description = event.description;
    eventResponse.imageUrl = event.imageUrl;
    eventResponse.price = event.price;
    eventResponse.organizerName = event.organizerName;
    eventResponse.category = event.category;
    eventResponse.ticketUrl = event.tickerUrl;
    eventResponse.free = !event.tickerUrl;

    return eventResponse;
  }

  static toEventResponseArray(events: Event[]): EventResponse[] {
    return events.map((event) => this.toEventResponse(event));
  }
}
