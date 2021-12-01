import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  testemail() {
    return { message: 'Welcome to enterprise-gateway!' }
  }
}
