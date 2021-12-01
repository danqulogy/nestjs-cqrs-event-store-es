import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzIconService } from 'ng-zorro-antd/icon';
import { MenuService } from '../menus';
import { AuthenticationService } from '../auth';
import { Title } from '@angular/platform-browser';


@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private authService: AuthenticationService,
    private titleService: Title,
    private httpClient: HttpClient,
    private injector: Injector,
    private router: Router
  ) {
    // Load icons used in the application
    // iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any): void {
    zip(
      this.authService.selectUser()
    ).pipe(
      catchError((res) => {
        console.warn(`StartupService.load: Network request failed`, res);
        resolve(null);
        return [];
      })
    ).subscribe(async ([appData]) => {
        console.log('startup data', appData);
        if(!appData){
          await this.router.navigateByUrl('/passport/login');
        }
        else{
          await this.router.navigateByUrl('/dashboard');
        }




        // Application data
        const res: any = appData;
        // User information: including name, avatar, email address
        // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
        // this.menuService.(res.menu);
      },
      () => { },
      () => {
        resolve(null);
      });
  }


  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.viaHttp(resolve, reject);
    });
  }
}
