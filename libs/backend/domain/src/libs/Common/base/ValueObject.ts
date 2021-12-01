import { IValueObject } from '../interfaces/IValueObject'
import { Validator } from 'class-validator'

export abstract class ValueObject<T> {
  protected static validator: Validator = new Validator()

  value: T




  equals(b: IValueObject) {

      const aProps = Object.getOwnPropertyNames(this.value);
      const bProps = Object.getOwnPropertyNames(b);

      if (aProps.length !== bProps.length) { return false }

      for (let i = 0; i < aProps.length; i++) {
          const propName = aProps[i];
          if (this.value[propName] !== b[propName]) { return false }
      }

      return true;
  }




}

