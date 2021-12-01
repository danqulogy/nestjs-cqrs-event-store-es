import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
import { AvatarModule } from 'ngx-avatar';
import { FilterTextboxComponent } from './filter-textbox.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

const MODULES = [
  CommonModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  HttpClientModule
]

const THIRDMODULES = [
  // NgxPermissionsModule,
  // PerfectScrollbarModule,
  MomentModule,
  // NgbModule,
  AvatarModule,
  // NestableModule,
  // ChartistModule,
  // ScrollingModule,
  // AntdModule
]

const COMPONENTS = [
  FilterTextboxComponent,
]
const DIRECTIVES = []
@NgModule({
  imports: [...MODULES, ...THIRDMODULES, NzInputModule, NzIconModule],
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [...MODULES, ...THIRDMODULES, ...COMPONENTS, ...DIRECTIVES]
})
export class WebFeaturesSharedUiModule {}
