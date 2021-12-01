import { IEvent } from '@nestjs/cqrs';
import { IUser } from '../../Users/IUser';

export class UserRegisteredEvent implements IEvent{
  constructor(public readonly savedUser: IUser,
              public readonly roleName: string,
              public readonly employeeName: string) {

  }

}

