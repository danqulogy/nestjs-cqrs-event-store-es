import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class PagerMiddleware implements NestMiddleware{
  use(req: any, res: any, next: () => void): any {
    req.query.limit = +req.query.take || 10;
    req.query.skip = +req.query.skip || 0;
    console.log('Request query: ', req.query)
    next();
  }

}