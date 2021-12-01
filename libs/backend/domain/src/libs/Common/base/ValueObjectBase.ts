
import { Validator } from 'class-validator'

export abstract class ValueObjectBase<T extends ValueObjectBase<T>> {
  protected static validator: Validator = new Validator()

  // value: T



  equals(obj: Object): boolean {
    const valueObject = obj as T;

    if (valueObject === null) return false;

    return this.equalsCore(valueObject);
  }

  protected abstract equalsCore(obj: T):boolean;

  //
  // getHashCode(){
  //   return this.getHashCodeCore();
  // }
  //
  // protected abstract getHashCodeCore();

  // equals(b: IValueObject) {
  //
  //     const aProps = Object.getOwnPropertyNames(this.value);
  //     const bProps = Object.getOwnPropertyNames(b);
  //
  //     if (aProps.length !== bProps.length) { return false }
  //
  //     for (let i = 0; i < aProps.length; i++) {
  //         const propName = aProps[i];
  //         if (this.value[propName] !== b[propName]) { return false }
  //     }
  //
  //     return true;
  // }




}

