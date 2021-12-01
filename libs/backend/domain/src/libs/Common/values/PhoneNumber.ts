import { ValueObject } from '../base';
import { isNumberString, length } from 'class-validator';

export class PhoneNumber extends ValueObject<string>{
  constructor(val: string) {
    super();
    this.value=val
  }

  static create(val: string){
    isNumberString(val)
    length(val,10,10)
    return new PhoneNumber(val)
  }
}
