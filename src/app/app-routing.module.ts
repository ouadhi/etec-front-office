import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from './app.authguard';

import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { RequestComponent } from './request/request.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { AdsDetailsComponent } from './ads-details/ads-details.component';
import { ProfileComponent } from './profile/profile.component';
import { AddOpportunityComponent } from './opportunities/add-opportunity/add-opportunity.component';
import { ViewOpportunityComponent } from './opportunities/view-opportunity/view-opportunity.component';
import { environment } from '../environments/environment';
import { AppRoleGuard } from './app.roleguard';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  // { path: '', pathMatch: 'full', component: MainPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'service-catalog' },
  {
    path: 'service-catalog', component: ServiceCatalogComponent,
    canActivate: [AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'my-requests', component: MyRequestsComponent,
    canActivate: [AppAuthGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'service-details/:id', component: ServiceDetailsComponent,
    canActivate: [AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'request/:id', component: RequestComponent,
    canActivate: [AppAuthGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'request-details/:link/:formData/:cmmnId', component: RequestDetailsComponent,
    canActivate: [AppAuthGuard],
    data: { roles: [environment.roles.beneficiary] },

  },
  {
    path: 'news-details/:id', component: NewsDetailsComponent,
    canActivate: [AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'ads-details/:id', component: AdsDetailsComponent,
    canActivate: [AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'profile/:id', component: ProfileComponent,
    canActivate: [AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'opportunity/add', component: AddOpportunityComponent,
    canActivate: [AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'opportunity/view/:id', component: ViewOpportunityComponent,
    canActivate: [AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard, AppRoleGuard]
})
export class AppRoutingModule { }
