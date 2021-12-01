import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Inject, Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import {AuthenticationService} from "../auth/authentication.service";
import { Router } from '@angular/router';
import { WINDOW } from '../services/windows.service';

@Injectable({ providedIn: 'root' })
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor(
    private notification: NzNotificationService,
    private authService: AuthenticationService,
    private router: Router,
    @Inject(WINDOW) private window: Window
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        }
      }),
      map(request => request),
      catchError( err =>  this.handleError(err)),
    )
  }

  handleError(err: any) {
    const error = err.error as { name: string; message: string; code: string }

    if (this.isAccessTokenUndefinedOrExpired(error)) {
      this.authService.logout()
    }

    switch (err.status) {
      case 401:
        this.authService.clear()
        this.router.navigate(['/passport/login'])
        // this.window.setTimeout(()=> {
        //   this.notification.error('Usage session expired!', 'Application will refresh for you to login again. Please wait...')
        //   this.window?.location?.reload()
        // },5000)
        break;
      case 403:
        this.notification.error(error.name, error.message)
        break

      default:
        break
    }
    return throwError(err)
  }

  isAccessTokenUndefinedOrExpired(error: { name: string; message: string; code: string }) {
    return error && error.message && error.message.includes('accessToken')
  }
}
