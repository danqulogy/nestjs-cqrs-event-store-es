import { IEvent } from '@nestjs/cqrs';
import { User } from '../user.model';

export class UserAccountVerifiedEvent implements IEvent {
  constructor(public readonly user: User) {

  }
}

