import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { NotAllowedComponent } from './shared/components/not-allowed/not-allowed.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  // },
  { path: '', pathMatch: 'full', redirectTo: 'service-catalog' },
  {
    path: 'service-catalog',
    loadChildren: () => import('./modules/services-catalog/services-catalog.module').then(m => m.ServicesCatalogModule),
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'requests',
    loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule),
  },
  {
    path: 'news',
    loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule),
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'ads',
    loadChildren: () => import('./modules/ads/ads.module').then(m => m.AdsModule),
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'accounts',
    loadChildren: () => import('./modules/accounts/accounts.module').then(m => m.AccountsModule),
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'notifications',
    loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule),
    data: { roles: [environment.roles.beneficiary] },
  },
  { path: '404', component: NotFoundComponent },
  {
    path: '401', component: NotAllowedComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuard, RoleGuard]
})
export class AppRoutingModule { }
