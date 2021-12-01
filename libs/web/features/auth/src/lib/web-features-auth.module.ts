import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { WebSharedUiAntModule } from '@fom/web/shared/ui-ant';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  }
]

@NgModule({
  imports: [CommonModule, FormsModule, WebSharedUiAntModule, RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [
    LoginComponent
  ],
})
export class WebFeaturesAuthModule {}
