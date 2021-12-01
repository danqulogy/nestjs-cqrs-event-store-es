import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { WebSharedUiAntModule } from '@fom/web/shared/ui-ant';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthContainerComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {title: 'Login'}
      },
      {
        path:'reset-password',
        component: ForgetPasswordComponent,
        data: {title: 'Recover password'}
      }
    ]
  },

]

@NgModule({
  imports: [CommonModule, FormsModule, WebSharedUiAntModule, RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [
    LoginComponent,
    AuthContainerComponent,
    ForgetPasswordComponent
  ],
})
export class WebSchoolAuthModule {}
