import * as moment from 'moment'
import { ValueObject } from '../base';
import { isNumberString } from 'class-validator';

export class ExpiryDate extends ValueObject<Date>{
  isExpired: boolean
  constructor(date: Date, isExpired = false) {
    super();
    this.value = date
    this.isExpired = isExpired
  }

  static create(daysToExpire:number){
    isNumberString(daysToExpire)
    const expiryDate = moment().add(daysToExpire,'days').toDate()
    return new ExpiryDate(expiryDate)
  }

  static fromValue(date: Date){
    const daysLeftToExpire =  moment(date).diff(moment(), 'days')
    let isExpired = false
    if(daysLeftToExpire < 0){
      isExpired = true
    }
        return new ExpiryDate(date, isExpired)
  }
}
