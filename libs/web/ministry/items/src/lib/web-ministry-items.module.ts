import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WebSharedFeatureNotificationsModule } from '@fom/web/shared/feature-notification';
import { WebSharedUiAntModule } from '@fom/web/shared/ui-ant';
import { WebFeaturesSharedUiModule } from '@fom/web/features/shared-ui';
import { FoodItemsListComponent } from './container/food-items-list.component';

const routes: Routes = [
  {
    path: '',
    component: FoodItemsListComponent,
    data: {title: 'Food Items'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WebSharedFeatureNotificationsModule,
    WebSharedUiAntModule,
    WebFeaturesSharedUiModule,
  ],
  declarations: [FoodItemsListComponent],
})
export class WebMinistryItemsModule {}
