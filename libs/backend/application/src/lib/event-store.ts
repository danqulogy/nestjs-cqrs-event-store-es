import { EventStoreDBClient, FORWARDS, START } from '@eventstore/db-client';

const eventStoreClient = EventStoreDBClient
  .connectionString("esdb://127.0.0.1:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000")

const connectToEventStore = async () => {
  await eventStoreClient.readAll({
    direction: FORWARDS,
    fromPosition: START,
    maxCount: 1000
  })
}

export {eventStoreClient, connectToEventStore}
