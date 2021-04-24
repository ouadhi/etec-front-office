import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { environment } from 'src/environments/environment';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestQueryComponent } from './request-query/request-query.component';
import { RequestTaskComponent } from './request-task/request-task.component';
import { RequestComponent } from './request/request.component';
import { ResultInfoComponent } from './request/result-info/result-info.component';

export const appRoutes: Routes = [
    {
        path: 'query',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: RequestQueryComponent,
                canActivate: [RoleGuard],
                data: {
                    roles: [environment.roles.beneficiary],

                },
            },
            {
                path: 'details/:id', component: RequestDetailsComponent,
                canActivate: [RoleGuard],
                data: { roles: [environment.roles.beneficiary] },

            },
        ]
    },
    {
        path: 'my', component: MyRequestsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [environment.roles.beneficiary] },
    },
    {
      path: 'task/:taskDefinitionKey/:taskId/:caseId/:requestId',
      component: RequestTaskComponent, canActivate: []
    },
    {
      path: 'arequest/:id', component: RequestComponent,
      canActivate: [RoleGuard],
      data: { roles: [environment.roles.beneficiary] },
    },
    {
      path: 'request/:id', component: RequestComponent,
      canActivate: [AuthGuard, RoleGuard],
      data: { roles: [environment.roles.beneficiary] },
    },
    {
      path: 'details/:id', component: RequestDetailsComponent,
     // canActivate: [AuthGuard, RoleGuard],
      data: { roles: [environment.roles.beneficiary] },
  
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule],
    providers: [],
})
export class RequestsRouterModule { }
