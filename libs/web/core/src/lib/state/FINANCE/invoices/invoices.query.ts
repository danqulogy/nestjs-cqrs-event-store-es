import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { InvoicesStore, InvoicesState } from './invoices.store';
import { map } from "rxjs/operators";
import { SettingsQuery, SettingsService } from "../../SHARED";
import { AppSettingsDto } from "@fom/shared/api-dtos";
import moment from "moment";

@Injectable({ providedIn: 'root' })
export class InvoicesQuery extends QueryEntity<InvoicesState> {



  currentMonthInvoices$ = this.selectAll().pipe(
    map(invoices => {
      return invoices.filter(i => {
        const invoiceDate = new Date(i.invoiceDate);
        return invoiceDate.getMonth()+1 ===  (<AppSettingsDto>this.settingsQuery.getActive()).currentPeriod
      })
    })
  )

  previousMonthInvoices$ = this.selectAll().pipe(
    map(invoices => {
      return invoices.filter(i => {
        const invoiceDate = new Date(i.invoiceDate);
        return invoiceDate.getMonth()+1 ===  (<AppSettingsDto>this.settingsQuery.getActive()).currentPeriod-1
      })
    })
  )

  currentYearInvoices$ = this.selectAll().pipe(
    map(invoices => {
      return invoices.filter(i => {
        const invoiceDate = new Date(i.invoiceDate);
        const currentYear = new Date(this.settingsQuery.getAll()[0].currentDate).getFullYear();
        return invoiceDate.getFullYear() ===  currentYear;
      })
    })
  )

  previousYearInvoices$ = this.selectAll().pipe(
    map(invoices => {
      return invoices.filter(i => {
        const invoiceDate = new Date(i.invoiceDate);
        const currentYear = new Date(this.settingsQuery.getAll()[0].currentDate).getFullYear();
        return invoiceDate.getFullYear() ===  currentYear-1;
      })
    })
  )

  overdueInvoices$ = this.selectAll().pipe(
    map(invoices => invoices.filter(i=> i.isOverdue && i.outstandingBalance > 0)),
  )

  overdue90Invoices$ = this.overdueInvoices$.pipe(
    map(invoices => invoices.filter(i => {
      const today =  moment(new Date());
      const overdueDate = moment(new Date(i.overdueDate));
      const overdueDays = today.diff(overdueDate, "days")
      return overdueDays >= 90 && overdueDays <=120;
    }))
  )

  overdue120Invoices$ = this.overdueInvoices$.pipe(
    map(invoices => invoices.filter(i => {
      const today =  moment(new Date());
      const overdueDate = moment(new Date(i.overdueDate));
      const overdueDays = today.diff(overdueDate, "days")
      return overdueDays >= 120
    }))
  )

  constructor(protected store: InvoicesStore,
              private settingsService: SettingsService, private settingsQuery: SettingsQuery) {
    super(store);
    this.settingsService.get().subscribe();
  }

}
