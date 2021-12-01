import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolsListComponent } from './schools-list/schools-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AddMemberComponent } from './add-school/add-member.component';
import { WebSharedUiAntModule } from '@fom/web/shared/ui-ant';
import { WebSharedFeatureNotificationsModule } from '@fom/web/shared/feature-notification';
import { WebFeaturesSharedUiModule } from '@fom/web/features/shared-ui';

const routes: Routes = [
  {
    path: '',
    component: SchoolsListComponent,
    data: { title: 'Schools Directory' },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WebSharedFeatureNotificationsModule,
    WebSharedUiAntModule,
    WebFeaturesSharedUiModule,
  ],
  declarations: [SchoolsListComponent, AddMemberComponent],
})
export class WebFeaturesSchoolsModule {}
