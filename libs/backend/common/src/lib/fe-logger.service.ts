import { Injectable, Logger, Scope } from '@nestjs/common'
import * as clc from 'cli-color'

@Injectable({scope: Scope.TRANSIENT})
export class FeLogger {
  private context: string = null
  constructor() {
  }

  setContext(context: string){
    this.context = context
  }

  log(message){
    Logger.log(clc.magentaBright(' '+ message+' '),this.context, true)
  }
}


