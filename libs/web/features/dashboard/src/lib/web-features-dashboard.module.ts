import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { RouterModule, Routes } from '@angular/router';
import { WebSharedFeatureNotificationsModule } from '@fom/web/shared/feature-notification';
import { WebSharedUiAntModule } from '@fom/web/shared/ui-ant';
import { WebFeaturesSharedUiModule } from '@fom/web/features/shared-ui';
import { TuiLegendItemModule, TuiPieChartModule } from '@taiga-ui/addon-charts';
import { TuiActionModule } from '@taiga-ui/kit';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    data: { title: "Dashboard"}
  }
]

@NgModule({
  imports: [CommonModule, WebSharedFeatureNotificationsModule,
    WebSharedUiAntModule,
    WebFeaturesSharedUiModule, RouterModule.forChild(routes), TuiPieChartModule, TuiLegendItemModule, TuiActionModule],
  declarations: [
    OverviewComponent
  ],
})
export class WebFeaturesDashboardModule {}
