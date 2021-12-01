import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '@fom/backend/domain';
import { FeLogger } from '@fom/backend/common';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredEventHandler implements IEventHandler<UserRegisteredEvent> {
  constructor(private console: FeLogger,
              private commandBus: CommandBus) {
    this.console.setContext(UserRegisteredEventHandler.name);
  }

  handle(event: UserRegisteredEvent): any {
    // return this.commandBus.execute(new RecordActivityCommand(
    //   null,
    //   null,
    //   `Registered ${event.employeeName} as a user with role of ${event.roleName}`,
    //   null
    //   )
    // );

  }

}
