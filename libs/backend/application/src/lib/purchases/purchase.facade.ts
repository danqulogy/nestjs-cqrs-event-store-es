import { eventStoreClient } from '@fom/backend/application';
import { Injectable } from '@nestjs/common';
import { START, Credentials } from '@eventstore/db-client';

@Injectable()
export class PurchaseFacade{

  client = eventStoreClient

  constructor() {

    const credentials:Credentials = {
      username: 'admin',
      password: 'changeit'
    }

    this.client.subscribeToAll({
      fromPosition: 'end',
      credentials: credentials
    }).on('data', (event) => {
      if(event.event.isJson && !event.event.type.startsWith('$') ){
        console.log('subscriptions',event.event)
      }
    })
  }
}
