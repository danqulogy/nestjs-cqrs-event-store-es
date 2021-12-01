import { Module } from '@nestjs/common';
import { FeLogger } from './fe-logger.service';

@Module({
  providers: [FeLogger],
  exports: [FeLogger],
})
export class BackendCommonModule {}
