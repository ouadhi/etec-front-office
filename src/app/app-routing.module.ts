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
import { AllOpportunitiesComponent } from './opportunities/all-opportunities/all-opportunities.component';
import { environment } from '../environments/environment';
import { AppRoleGuard } from './app.roleguard';
import { NotFoundComponent } from './not-found/not-found.component';
import { RequestTaskComponent } from './request-task/request-task.component';
import { ApplyOpportunityComponent } from './opportunities/apply-opportunity/apply-opportunity.component';
import { AppliedOpportunityComponent } from './opportunities/applied-opportunity/applied-opportunity.component';
import { NotificationsIndexComponent } from './notifications-index/notifications-index.component';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';
import { RequestQueryComponent } from './request-query/request-query.component';


const routes: Routes = [
  // { path: '', pathMatch: 'full', component: MainPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'service-catalog' },
  {
    path: 'service-catalog', component: ServiceCatalogComponent,
    canActivate: [AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'query-request',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RequestQueryComponent,
        canActivate: [AppRoleGuard],
        data: {
          roles: [environment.roles.beneficiary],

        },
      },
      {
        path: 'request-details/:id', component: RequestDetailsComponent,
        canActivate: [AppRoleGuard],
        data: { roles: [environment.roles.beneficiary] },

      },
    ]
  },
  {
    path: 'my-requests', component: MyRequestsComponent,
    canActivate: [AppAuthGuard, AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'request-task/:taskId/:caseId/:requestId',
    component: RequestTaskComponent, canActivate: []
  },
  {
    path: 'service-details/:id', component: ServiceDetailsComponent,
    canActivate: [AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'arequest/:id', component: RequestComponent,
    canActivate: [AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'request/:id', component: RequestComponent,
    canActivate: [AppAuthGuard, AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'request-details/:id', component: RequestDetailsComponent,
    canActivate: [AppAuthGuard, AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },

  },
  {
    path: 'news-details/:id', component: NewsDetailsComponent,
    canActivate: [AppAuthGuard, AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'ads-details/:id', component: AdsDetailsComponent,
    canActivate: [AppAuthGuard, AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [AppAuthGuard, AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  {
    path: 'opportunity/add', component: AddOpportunityComponent,
    canActivate: [AppAuthGuard, AppRoleGuard],
    data: { roles: [environment.roles.branch_specialist, environment.roles.department_specialist] },
  },
  {
    path: 'opportunity/view/:id', component: ViewOpportunityComponent,
    canActivate: [AppAuthGuard, AppRoleGuard],
    data: { roles: [environment.roles.branch_specialist, environment.roles.department_specialist, environment.roles.beneficiary] },
  },
  {
    path: 'opportunity/apply/:id', component: ApplyOpportunityComponent,
    canActivate: [AppAuthGuard, AppRoleGuard],
    data: { roles: [environment.roles.branch_specialist, environment.roles.department_specialist, environment.roles.beneficiary] },
  },
  {
    path: 'opportunity/applied/:id', component: AppliedOpportunityComponent,
    canActivate: [AppAuthGuard, AppRoleGuard],
    data: { roles: [environment.roles.branch_specialist, environment.roles.department_specialist, environment.roles.beneficiary] },
  },
  {
    path: 'opportunity/all', component: AllOpportunitiesComponent,
    canActivate: [AppAuthGuard, AppRoleGuard],
    data: { roles: [environment.roles.branch_specialist, environment.roles.department_specialist, environment.roles.beneficiary] },
  },
  {
    path: 'notifications',
    component: NotificationsIndexComponent,
    canActivate: [AppAuthGuard, AppRoleGuard],
    data: { roles: [environment.roles.beneficiary] },
  },
  { path: '404', component: NotFoundComponent },
  {
    path: '401', component: NotAllowedComponent,
    canActivate: [AppAuthGuard],
  },
  { path: '**', redirectTo: '404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard, AppRoleGuard]
})
export class AppRoutingModule { }
