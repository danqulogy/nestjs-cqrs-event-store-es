import { Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import { map } from 'rxjs/operators'
import { SendUserConfirmationEmailCommand } from './commands'
import { UserRegisteredEvent } from '@fom/backend/domain';

@Injectable()
export class AuthSaga {

  @Saga()
  userRegistered =  (events$: Observable<any>): Observable<ICommand> => {
    return  events$.pipe(
      ofType(UserRegisteredEvent),
      map(event => new SendUserConfirmationEmailCommand(event.savedUser))
    )
  }
}
