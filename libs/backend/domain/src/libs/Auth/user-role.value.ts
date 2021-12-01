import { ValueObject } from '../Common/base';
import { isEnum, isNotEmpty } from 'class-validator';
import { Roles } from '../Users';

export class UserRole extends ValueObject<string> {
  constructor(role: string) {
    super();
    this.value = role
  }

  static create(role: string){
    isNotEmpty(role)
    isEnum(role, Roles)
    return new UserRole(role)
  }
}
