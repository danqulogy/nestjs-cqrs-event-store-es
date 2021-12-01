import { IEvent } from '@nestjs/cqrs';
import { AppEventsEnum } from '../purchases/views';

export interface IBusinessEvent{
  streamId: string
  type: AppEventsEnum
  data: any
}

export interface BusinessEvent<T> extends IEvent{
  streamId: string
  type: AppEventsEnum
  data: T
}
