import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RoutesRoutingModule } from './routes-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { FullscreenComponent } from './layouts/fullscreen/fullscreen.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';
import { MetroCrmComponent } from './components/metro-crm/metro-crm.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { MenuLeftNavComponent } from './components/menu-left-nav/menu-left-nav.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import {
  API_BASE_URL,
  DEPARTMENT_NAME,
  IS_PRODUCTION_ENVIRONMENT,
  SERVER_BASE_URL,
  SYSTEM_DEPARTMENT_NAME,
  WebCoreModule
} from '@fom/web/core';
import { WebSharedUiAntModule } from '@fom/web/shared/ui-ant';
import { TuiDialogModule, TuiNotificationsModule, TuiRootModule } from '@taiga-ui/core';

registerLocaleData(en);




@NgModule({
  declarations: [AppComponent, DashboardLayoutComponent, FullscreenComponent, MetroCrmComponent, MenuLeftNavComponent,MobileNavComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AvatarModule,
    WebCoreModule,
    WebSharedUiAntModule,
    RoutesRoutingModule,
    IconsProviderModule,
    TuiRootModule,
    TuiNotificationsModule,
    TuiDialogModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    { provide: API_BASE_URL, useValue: environment.api},
    { provide: SERVER_BASE_URL, useValue: environment.server},
    { provide: DEPARTMENT_NAME, useValue: environment.departmentName },
    { provide: IS_PRODUCTION_ENVIRONMENT, useValue: environment.production },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
