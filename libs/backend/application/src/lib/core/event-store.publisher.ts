import { eventStoreClient } from '@fom/backend/application';
import { AppendResult, JSONEventData } from '@eventstore/db-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventStorePublisher{
  private client = eventStoreClient

  async writeEvent(streamName: string, eventData: JSONEventData ): Promise<AppendResult> {
    return await this.client.appendToStream(streamName,[eventData], {})
  }

  getStreamById(streamName){
    return this.client.readStream(streamName)
  }

}
