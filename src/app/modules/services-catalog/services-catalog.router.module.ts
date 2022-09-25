import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { environment } from 'src/environments/environment';
import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';

export const appRoutes: Routes = [
    {
        path: 'details/:id', component: ServiceDetailsComponent,
        canActivate: [RoleGuard],
        data: { roles: [environment.roles.beneficiary] },
    },
    {
        path: 'details/:id/apply', component: ServiceDetailsComponent,
        canActivate: [RoleGuard],
        data: { roles: [environment.roles.beneficiary] },
    },
    {
        path: '',
        component: ServiceCatalogComponent,
        canActivate: [RoleGuard],
        data: { roles: [environment.roles.beneficiary] },
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule],
    providers: [],
})
export class ServicesCatalogRouterModule { }
