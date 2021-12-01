import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { QuotesStore, QuotesState } from './quotes.store';
import { map } from 'rxjs/operators';
import { AppSettingsDto } from '@fom/shared/api-dtos';
import { SettingsQuery, SettingsService } from '../../SHARED';

@Injectable({ providedIn: 'root' })
export class QuotesQuery extends QueryEntity<QuotesState> {
  currentMonthQuotes$ = this.selectAll().pipe(
    map((quotes) => {
      return quotes.filter((i) => {
        const quoteDate = new Date(i.estimateDate);
        return (
          quoteDate.getMonth() + 1 ===
          (<AppSettingsDto>this.settingsQuery.getActive()).currentPeriod
        );
      });
    })
  );

  previousMonthQuotes$ = this.selectAll().pipe(
    map((quotes) => {
      return quotes.filter((i) => {
        const quoteDate = new Date(i.estimateDate);
        return (
          quoteDate.getMonth() + 1 ===
          (<AppSettingsDto>this.settingsQuery.getActive()).currentPeriod - 1
        );
      });
    })
  );

  constructor(
    protected store: QuotesStore,
    private settingsService: SettingsService,
    private settingsQuery: SettingsQuery
  ) {
    super(store);
    this.settingsService.get().subscribe();
  }
}
