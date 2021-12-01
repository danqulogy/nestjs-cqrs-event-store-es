import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppSaga } from './app.saga';
import { SchoolsModule } from './schools/schools.module';
import { SmsModule } from './sms/sms.module';
import { FoodItemsModule } from './food-items/food-items.module';
import { UomModule } from './uom/uom.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [AuthModule, SchoolsModule, SmsModule, FoodItemsModule, UomModule],
  providers: [AppSaga],
  exports: [],
})
export class BackendApplicationModule {}
