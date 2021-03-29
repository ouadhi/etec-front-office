import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { environment } from 'src/environments/environment';
import { MainPageComponent } from './main-page/main-page.component';

export const appRoutes: Routes = [
    {
        path: '', component: MainPageComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [environment.roles.beneficiary] },
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule],
    providers: [],
})
export class DashboardRouterModule { }
