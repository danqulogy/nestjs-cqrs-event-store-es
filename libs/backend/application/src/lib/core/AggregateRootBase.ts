import { AggregateRoot, IEvent } from '@nestjs/cqrs';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EventStorePublisher } from './event-store.publisher';
import { jsonEvent } from '@eventstore/db-client';
import { IBusinessEvent } from './IBusinessEvent';

@Injectable()
export class AggregateRootBase extends AggregateRoot {
  eventStore = new EventStorePublisher();

  uncommittedEvents: IBusinessEvent[] = [];

  constructor() {
    super();
  }

  async applyEvent(event: IBusinessEvent, isFromHistory?: boolean) {
    await this.apply(event, isFromHistory);
    this.uncommittedEvents.push(event);
  }

  async apply<T extends IEvent>(event: T, isFromHistory?: boolean) {
    super.apply(event, isFromHistory);
  }

  async commit() {
    try {
      for (let i = 0; i < this.uncommittedEvents.length; i++) {
        const payload = this.uncommittedEvents[i];
        const happening = jsonEvent({
          type: payload.type,
          data: { ...payload.data },
        });
        await this.eventStore.writeEvent(payload.streamId, happening);
      }
      super.commit();
    } catch (e) {
      console.error('An error occured while commiting events to store', e)
      throw new BadRequestException('An error occurred while commiting events to store', e)
    }
  }

  loadFromHistory(history: IEvent[]) {
    super.loadFromHistory(history);
  }
}
