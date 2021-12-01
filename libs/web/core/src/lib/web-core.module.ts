import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import { AUTH_SERVICE, AuthModule, PROTECTED_FALLBACK_PAGE_URI, PUBLIC_FALLBACK_PAGE_URI } from "ngx-auth";
import { NgxPermissionsModule } from "ngx-permissions";
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressRouterModule } from "ngx-progressbar/router";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { MomentModule } from "ngx-moment";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorsInterceptor } from "./interceptors/http-errors.interceptor";
import { en_US as localeZorro, NZ_I18N } from "ng-zorro-antd/i18n";
import { default as localeEn } from "@angular/common/locales/en";
import { IconDefinition } from "@ant-design/icons-angular";
import { AuthEffects, AuthenticationService, authReducer, factory } from "./auth";
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
import { WINDOW_PROVIDERS } from "./services/windows.service";
import { NZ_ICONS } from "ng-zorro-antd/icon";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { FormsModule } from '@angular/forms';

// const LOCALE_PROVIDERS = [
//   { provide: LOCALE_ID, useValue: 'en' },
//   { provide: NZ_I18N, useValue: localeZorro }
// ]
// registerLocaleData(localeEn, 'en')
const icons: IconDefinition[] = []


@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    FormsModule,

    NgxPermissionsModule.forRoot(),
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#c20acf',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,
    HttpClientModule,

    // MomentModule.forRoot({
    //   relativeTimeThresholdOptions: { m: 59 }
    // }),
    // NgxUiLoaderModule,
    // NgxUiLoaderRouterModule,
    // NgxUiLoaderHttpModule,
    // LoggerModule.forRoot({
    //   level: NgxLoggerLevel.INFO,
    //   serverLogLevel: NgxLoggerLevel.ERROR
    // })
  ],
  providers: [
    AuthEffects,
    WINDOW_PROVIDERS,
    // ...LOCALE_PROVIDERS,
    { provide: NZ_ICONS, useValue: icons },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
    {provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/dashboard'},
    {provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/passport/login'},
    {
      provide: AUTH_SERVICE,
      deps: [AuthenticationService],
      useFactory: factory,
    },
  ],
  exports: [
    NgProgressModule, NgProgressRouterModule, NgProgressHttpModule, FormsModule, HttpClientModule
    // NgxUiLoaderModule, NgxUiLoaderHttpModule, */
  ]
})
export class WebCoreModule {
  constructor() {
  }
}


