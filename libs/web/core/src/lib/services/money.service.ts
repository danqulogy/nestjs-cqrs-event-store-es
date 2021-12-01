import { Injectable } from "@angular/core";

import Big from 'big.js'

@Injectable({providedIn: 'root'})
export class MoneyService{

  constructor(){
    Big.RM = Big.roundDown
  }

  formatMoney(value: number) {
    return +(new Big(value).toFixed(2));
  }
}
