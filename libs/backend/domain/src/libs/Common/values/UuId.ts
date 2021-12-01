import { v4 as guid } from 'uuid'

export class UuId {
  static generateKey(): string {
    return guid()
  }
}
