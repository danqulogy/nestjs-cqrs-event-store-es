import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { AccountTypesState, AccountTypesStore } from "./account-types.store";
import { map } from "rxjs/operators";
import { AccountKindEnum } from "@fom/shared/api-dtos";

@Injectable({ providedIn: 'root' })
export class AccountTypesQuery extends QueryEntity<AccountTypesState> {

  assetsAccountTypes$ = this.selectAll().pipe(
    map(accountTypes => accountTypes.filter(t => t._accountGroup.type === AccountKindEnum.Asset))
  );

  liabilitiesAccountTypes$ = this.selectAll().pipe(
    map(accountTypes => accountTypes.filter(t => t._accountGroup.type === AccountKindEnum.Liability))
  );

  equityAccountTypes$ = this.selectAll().pipe(
    map(accountTypes => accountTypes.filter(t => t._accountGroup.type === AccountKindEnum.Equity))
  );

  revenueAccountTypes$ = this.selectAll().pipe(
    map(accountTypes => accountTypes.filter(t => t._accountGroup.type === AccountKindEnum.Revenue))
  );

  expensesAccountTypes$ = this.selectAll().pipe(
    map(accountTypes => accountTypes.filter(t => t._accountGroup.type === AccountKindEnum.Expense))
  );

  constructor(protected store: AccountTypesStore) {
    super(store);
  }

}
