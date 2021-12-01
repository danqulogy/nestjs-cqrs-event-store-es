import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdateUserEmailCommand } from "./auth/commands/update-user-email.command";
import { UpdateUserDisplayNameCommand } from "./auth/commands/update-user-display-name.command";

@Injectable()
export class AppSaga {
  // @Saga()
  // officeEmailChanged = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(EmployeeOfficeEmailChangedEvent),
  //     map((event:EmployeeOfficeEmailChangedEvent) => {
  //       Logger.log('Updating related user email...')
  //       return new UpdateUserEmailCommand(event.employeeId, event.previousOfficeEmail, event.newOfficeEmail)
  //      })
  //   );
  // }
  //
  // @Saga()
  // employeeFirstNameChanged = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(EmployeeFirstNameChangedEvent),
  //     map((event:EmployeeFirstNameChangedEvent) => {
  //       Logger.log('Updating related user display name...')
  //       return new UpdateUserDisplayNameCommand(event.employeeId, event.previousName, event.currentName)
  //     })
  //   );
  // }

  // @Saga()
  // transactionRecorded = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(JournalTransactionRecordedEvent),
  //     map((event:JournalTransactionRecordedEvent) => {
  //       Logger.log('Updating trial balances for all main accounts')
  //       return new UpdateMainLedgersTrialBalancesCommand()
  //     })
  //   );
  // }

}
