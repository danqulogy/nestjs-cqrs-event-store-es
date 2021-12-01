import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkSmsComponent } from './bulk-sms/bulk-sms.component';
import { RouterModule, Routes } from '@angular/router';
import { WebSharedFeatureNotificationsModule } from '@fom/web/shared/feature-notification';
import { WebSharedUiAntModule } from '@fom/web/shared/ui-ant';
import { WebFeaturesSharedUiModule } from '@fom/web/features/shared-ui';

const routes: Routes = [
  {
    path: '',
    component: BulkSmsComponent,
    data: {title: 'Bulk SMS'}
  }
]

@NgModule({
  imports: [CommonModule,  WebSharedFeatureNotificationsModule,
    WebSharedUiAntModule,
    WebFeaturesSharedUiModule, RouterModule.forChild(routes)],
  declarations: [
    BulkSmsComponent
  ],
})
export class WebFeaturesSmsModule {}
