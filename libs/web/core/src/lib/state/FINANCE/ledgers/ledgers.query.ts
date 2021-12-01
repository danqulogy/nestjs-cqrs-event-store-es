import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LedgersState, LedgersStore } from './ledgers.store';
import { map } from 'rxjs/operators';
import { AccountKindEnum, DefaultAppSettings } from "@fom/shared/api-dtos";

@Injectable({ providedIn: 'root' })
export class LedgersQuery extends QueryEntity<LedgersState> {
  assetAccounts$ = this.selectAll().pipe(
    map((accounts) => accounts.filter((a) => a.accountKind === AccountKindEnum.Asset))
  );
  liabilitiesAccounts$ = this.selectAll().pipe(
    map((accounts) => accounts.filter((a) => a.accountKind === AccountKindEnum.Liability))
  );
  equityAccounts$ = this.selectAll().pipe(
    map((accounts) => accounts.filter((a) => a.accountKind === AccountKindEnum.Equity))
  );

  revenueAccounts$ = this.selectAll().pipe(
    map((accounts) => accounts.filter((a) => a.accountKind === AccountKindEnum.Revenue))
  );

  expenseAccounts$ = this.selectAll().pipe(
    map((accounts) => accounts.filter((a) => a.accountKind === AccountKindEnum.Expense))
  );

  bankAccounts$ = this.selectAll().pipe(
    map((accounts) => accounts.filter((a) =>
      a.accountTypeId === DefaultAppSettings.BANK_ACCOUNTS_ACCOUNT_TYPE_ID))
  );

  cashInHand$ = this.selectAll().pipe(
    map((accounts) => accounts.filter((a) =>
      a.accountTypeId === DefaultAppSettings.CASH_IN_HAND_ACCOUNT_TYPE_ID))
  );

  accountReceivables$ = this.selectAll().pipe(
    map((accounts) => accounts.filter((a) =>
      a.accountTypeId === DefaultAppSettings.RECEIVABLES_ACCOUNT_TYPE_ID))
  );



  constructor(protected store: LedgersStore) {
    super(store);
  }
}
