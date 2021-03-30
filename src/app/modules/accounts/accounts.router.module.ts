import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { environment } from 'src/environments/environment';
import { AccountsComponent } from './accounts.component';
import { ProfileComponent } from './profile/profile.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AccountsComponent,
        redirectTo: `profile`,
        data: { roles: [environment.roles.beneficiary] },
    },
    {
        path: 'profile', component: ProfileComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [environment.roles.beneficiary] },
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule],
    providers: [],
})
export class AccountsRouterModule { }