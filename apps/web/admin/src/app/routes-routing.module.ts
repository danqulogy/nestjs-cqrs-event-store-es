import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { RoutesPreloader } from '@fom/web/core';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { FullscreenComponent } from './layouts/fullscreen/fullscreen.component';

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
          import('@fom/web/features/dashboard').then(
            (m) => m.WebFeaturesDashboardModule
        ),
      },
      {
        path: 'schools',
        loadChildren: () =>
          import('@fom/web/features/schools').then(
            (m) => m.WebFeaturesSchoolsModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@fom/web/features/users').then((m) => m.WebFeaturesUsersModule),
      },
      {
        path: 'items',
        loadChildren: () =>
          import('@fom/web/ministry/items').then((m) => m.WebMinistryItemsModule),
      },
    ],
  },
  {
    path: 'passport',
    component: FullscreenComponent,
    canActivate: [PublicGuard],
    canActivateChild: [PublicGuard],
    loadChildren: () => import('@fom/web/features/auth').then(m => m.WebFeaturesAuthModule)
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
  ],
  providers: [RoutesPreloader],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
