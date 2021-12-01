import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { JournalsState, JournalsStore } from "./journals.store";
import { map } from "rxjs/operators";
import { TransactionType, TrialBalanceReportLineItem } from "@fom/shared/api-dtos";
import { LedgerService, LedgersQuery } from "../ledgers";
import { combineLatest } from "rxjs";

@Injectable({ providedIn: 'root' })
export class JournalsQuery extends QueryEntity<JournalsState> {
  totalDebitsAmount$ = this.selectAll().pipe(
    map((transactions) => {
      return transactions
        .filter((t) => t.transactionType === TransactionType.Debit)
        .map((t) => t.amount)
        .reduce((a, b) => a + b, 0);
    })
  );

  totalCreditsAmount$ = this.selectAll().pipe(
    map((transactions) => {
      return transactions
        .filter((t) => t.transactionType === TransactionType.Credit)
        .map((t) => t.amount)
        .reduce((a, b) => a + b, 0);
    })
  );

  private transactions$ = this.selectAll();

  private ledgers$ = this.ledgerQuery
    .selectAll()
    .pipe(map((ledgers) => ledgers.sort((a, b) => a.name.localeCompare(b.name))));

  trialBalanceLineItems$ = combineLatest([
    this.ledgers$,
    this.transactions$
  ]).pipe(
    map(([ledgers, transactions]) => {
      return ledgers.map(account => {
        const totalDebitTransactions = transactions
          .filter(t => t.accountId === account._id)
          .filter(t => t.transactionType === TransactionType.Debit)
          .map(t => t.amount)
          .reduce((a, b) => a+b, 0)
        const totalCreditTransactions = transactions
          .filter(t => t.accountId === account._id)
          .filter(t => t.transactionType === TransactionType.Credit)
          .map(t => t.amount)
          .reduce((a, b) => a+b, 0)


        const lineItem:TrialBalanceReportLineItem = {
          accountId: account._id,
          accountName: account.name,
          accountGroupId: account.accountGroupId,
          accountGroupName: account.accountGroupName,
          accountTypeId: account.accountTypeId,
          accountTypeName: account.accountTypeName,
          kind: account.accountKind,
          debits: totalDebitTransactions,
          credits: totalCreditTransactions
        }

        return lineItem;
      })
    })
  )

  constructor(
    protected store: JournalsStore,
    private ledgersService: LedgerService,
    private ledgerQuery: LedgersQuery
  ) {
    super(store);
    this.ledgersService.getLedgers().subscribe();
  }
}
