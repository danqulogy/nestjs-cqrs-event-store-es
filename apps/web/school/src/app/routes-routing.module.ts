import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { RoutesPreloader } from '@fom/web/core';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { FullscreenComponent } from './layouts/fullscreen/fullscreen.component';
import { WebSchoolEnrollmentModule } from '@fom/web/school/enrollment';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [ProtectedGuard],
    canActivateChild: [ProtectedGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@fom/web/school/dashboard').then(
            (m) => m.WebSchoolDashboardModule
        ),
      },

      {
        path: 'inventory',
        loadChildren: () =>
          import('@fom/web/school/inventory').then(
            (m) => m.WebSchoolInventoryModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@fom/web/features/users').then((m) => m.WebFeaturesUsersModule),
      },
    ],
  },
  {
    path: 'passport',
    component: FullscreenComponent,
    canActivate: [PublicGuard],
    canActivateChild: [PublicGuard],
    loadChildren: () => import('@fom/web/school/auth').then(m => m.WebSchoolAuthModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'top',
      useHash: true,
      preloadingStrategy:RoutesPreloader
    }),
    WebSchoolEnrollmentModule
  ],
  providers: [RoutesPreloader],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
