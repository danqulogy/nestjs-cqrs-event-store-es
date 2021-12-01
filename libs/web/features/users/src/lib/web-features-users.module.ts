import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { WebSharedUiAntModule } from '@fom/web/shared/ui-ant';
import { WebSharedFeatureNotificationsModule } from '@fom/web/shared/feature-notification';
import { WebFeaturesSharedUiModule } from '@fom/web/features/shared-ui';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: { title: 'Manage users' },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WebSharedUiAntModule,
    WebSharedFeatureNotificationsModule,
    WebFeaturesSharedUiModule,
  ],
  declarations: [UsersComponent],
})
export class WebFeaturesUsersModule {}
