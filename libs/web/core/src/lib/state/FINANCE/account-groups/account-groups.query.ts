import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AccountGroupsState, AccountGroupsStore } from './account-groups.store';
import { map } from 'rxjs/operators';
import { AccountKindEnum } from '@fom/shared/api-dtos';

@Injectable({ providedIn: 'root' })
export class AccountGroupsQuery extends QueryEntity<AccountGroupsState> {
  assetsGroups$ = this.selectAll().pipe(
    map((assetGroups) => assetGroups.filter((g) => g.type === AccountKindEnum.Asset))
  );
  equityGroups$ = this.selectAll().pipe(
    map((assetGroups) => assetGroups.filter((g) => g.type === AccountKindEnum.Equity))
  );
  liabilityGroups$ = this.selectAll().pipe(
    map((assetGroups) => assetGroups.filter((g) => g.type === AccountKindEnum.Liability))
  );

  expensesGroups$ = this.selectAll().pipe(
    map((assetGroups) => assetGroups.filter((g) => g.type === AccountKindEnum.Expense))
  );
  revenueGroups$ = this.selectAll().pipe(
    map((assetGroups) => assetGroups.filter((g) => g.type === AccountKindEnum.Revenue))
  );
  constructor(protected store: AccountGroupsStore) {
    super(store);
  }
}
