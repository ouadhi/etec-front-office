import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { environment } from 'src/environments/environment';
import { AdsDetailsComponent } from './ads-details/ads-details.component';
import { AdsComponent } from './ads.component';

export const appRoutes: Routes = [
    {
        path: 'details/:id', component: AdsDetailsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [environment.roles.beneficiary] },
    },
    {
        path: '',
        component: AdsComponent,
        redirectTo: `/`,
        data: { roles: [environment.roles.beneficiary] },
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule],
    providers: [],
})
export class AdsRouterModule { }
