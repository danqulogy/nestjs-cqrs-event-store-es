import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { WebSharedFeatureNotificationsModule } from '@fom/web/shared/feature-notification';
import { WebSharedUiAntModule } from '@fom/web/shared/ui-ant';
import { WebFeaturesSharedUiModule } from '@fom/web/features/shared-ui';
import { InventoryContainerComponent } from './container/inventory-container.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryContainerComponent,
    data: {title: 'Inventory'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    RouterModule.forChild(routes),
    WebSharedFeatureNotificationsModule,
    WebSharedUiAntModule,
    WebFeaturesSharedUiModule,
  ],
  declarations: [InventoryContainerComponent],
})
export class WebSchoolInventoryModule {}
