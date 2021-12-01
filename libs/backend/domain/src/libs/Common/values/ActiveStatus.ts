import { isBoolean } from 'class-validator'
import { ValueObject } from '../base';

export class ActiveStatus extends ValueObject<boolean> {
  readonly value: boolean

  constructor(value: boolean) {
    super()
    this.value = value
  }

  static create(val: boolean) {
    isBoolean(val)
    return new ActiveStatus(val)
  }
}
