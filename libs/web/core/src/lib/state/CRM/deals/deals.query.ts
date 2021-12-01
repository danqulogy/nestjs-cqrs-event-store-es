import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { DealsState, DealsStore } from "./deals.store";
import { map } from "rxjs/operators";
import { DealStageEnum } from "@fom/shared/api-dtos";

@Injectable({ providedIn: 'root' })
export class DealsQuery extends QueryEntity<DealsState> {

  qualificationStage$ =  this.selectAll().pipe(
    map(deals => deals.filter(d => d.stage === DealStageEnum.QUALIFICATION)
      .map(d => d.amount)
      .reduce((a,b) => a+b, 0))
  )

  proposalAndPriceQuote$ =  this.selectAll().pipe(
    map(deals => deals.filter(d => d.stage === DealStageEnum.PROPOSAL_PRICE_QUOTE)
      .map(d => d.amount)
      .reduce((a,b) => a+b, 0))
  )

  negotiationAndReview$ =  this.selectAll().pipe(
    map(deals => deals.filter(d => d.stage === DealStageEnum.NEGOTIATION_REVIEW)
      .map(d => d.amount)
      .reduce((a,b) => a+b, 0))
  )


  closedWon$ =  this.selectAll().pipe(
    map(deals => deals.filter(d => d.stage === DealStageEnum.CLOSED_WON)
      .map(d => d.amount)
      .reduce((a,b) => a+b, 0))
  )

  closedLost$ =  this.selectAll().pipe(
    map(deals => deals.filter(d => d.stage === DealStageEnum.CLOSED_LOST)
      .map(d => d.amount)
      .reduce((a,b) => a+b, 0))
  )


  constructor(protected store: DealsStore) {
    super(store);
  }

}
