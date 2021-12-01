import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentFormComponent } from './school-enrollment-form/enrollment-form.component';
import { WebSharedUiAntModule } from '@fom/web/shared/ui-ant';
import { EnrollmentContainerComponent } from './container/enrollment-container.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { WebSharedFeatureNotificationsModule } from '@fom/web/shared/feature-notification';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'enrollment',
    component: EnrollmentContainerComponent,
    children: [
      {
        path: '',
        component: EnrollmentFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    WebSharedUiAntModule,
    WebSharedFeatureNotificationsModule,
    RouterModule.forChild(routes),
    NgxIntlTelInputModule,
    ReactiveFormsModule
  ],
  declarations: [EnrollmentFormComponent, EnrollmentContainerComponent],
})
export class WebSchoolEnrollmentModule {}
