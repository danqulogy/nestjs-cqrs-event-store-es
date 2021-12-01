import { IEvent } from '@nestjs/cqrs';

export class AccountActivatedEvent implements IEvent {
  constructor(public readonly displayName: string,
              public readonly email: string,
              public readonly hiddenPassword: string) {}
}

