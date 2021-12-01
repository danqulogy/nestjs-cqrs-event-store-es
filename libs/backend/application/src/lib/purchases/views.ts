import { eventStoreClient as eventStore } from '../event-store';
import { FORWARDS, JSONEventType, START } from '@eventstore/db-client';

interface Purchase {
  purchaseId: string;
  name: string;
  amount: number;
  wasRefunded: boolean;
}

export enum AppEventsEnum{
  FoodItemAdded = 'FoodItemAddedEvent',
  ProductPurchasedEvent = 'ProductPurchasedEvent',
  ProductPurchased = 'ProductPurchased',
  ProductRefunded =  'ProductRefunded'
}


export type ProductPurchasedEvent = JSONEventType<AppEventsEnum.ProductPurchased, {
  purchaseId: string,
  amount: number
  name: string
}>

export type ProductRefundedEvent =  JSONEventType<AppEventsEnum.ProductRefunded, {
  purchaseId: string
}>

export type PurchaseEvents = ProductPurchasedEvent | ProductRefundedEvent

const getAllPurchases = async () => {
  const purchases: Purchase[] = [];
  const getPurchaseById = createGetPurchaseById(purchases);

  const events = eventStore.readAll({
    fromPosition: START,
    direction: FORWARDS,
    maxCount: 1000,
  });


  for await (const {event} of events) {

    // console.log('resolved-event',event.type)

    const data = event.data;

    if (event?.type.startsWith("$")) {
      continue;
    }


    switch (event?.type) {
      case AppEventsEnum.ProductPurchased:
        purchases.push({
          purchaseId: data['purchaseId'],
          amount: data['amount'],
          name: data['name'],
          wasRefunded: false,
        });
        break;

      case AppEventsEnum.ProductRefunded:
        getPurchaseById(data['purchaseId']).wasRefunded = true;
        break;
    }

  }

  return purchases;
};

const createGetPurchaseById = (purchases: Purchase[]) => (purchaseId) =>
  purchases.find((p) => p.purchaseId === purchaseId);


export {
  getAllPurchases,
  Purchase
}
