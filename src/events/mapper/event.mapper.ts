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
    eventResponse.venueName = event.venueName;
    eventResponse.address = event.address || event.venueName;
    eventResponse.city = event.city;
    eventResponse.lat = event.lat;
    eventResponse.lng = event.lng;
    eventResponse.description = event.description;
    eventResponse.imageUrl = event.imageUrl;
    eventResponse.priceFrom = event.priceFrom;
    eventResponse.priceTo = event.priceTo;
    eventResponse.organizerName = event.organizerName;
    eventResponse.category = event.category;
    eventResponse.ticketUrl = event.tickerUrl;
    eventResponse.sourceUrl = event.sourceUrl;
    eventResponse.ticketPurchaseNote = event.ticketPurchaseNote;
    eventResponse.free =
      !event.priceFrom &&
      !event.priceTo &&
      !event.tickerUrl &&
      !event.ticketPurchaseNote;

    return eventResponse;
  }

  static toEventResponseArray(events: Event[]): EventResponse[] {
    return events.map((event) => this.toEventResponse(event));
  }
}
