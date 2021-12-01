import { ValueObject } from '../base';
import { isNotEmpty } from 'class-validator';

export class PersonName extends ValueObject<string>{

    readonly value: string

    private constructor(value: string) {
        super();
        this.value = value
    }

    static create(val: string, isMiddleName: boolean= false){
       if(!isMiddleName){
           isNotEmpty(val)
           return new PersonName(val)
       }
       return new PersonName(val)
    }
}
