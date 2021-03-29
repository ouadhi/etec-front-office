import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { environment } from 'src/environments/environment';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsComponent } from './news.component';

export const appRoutes: Routes = [
    {
      path: 'details/:id', component: NewsDetailsComponent,
      canActivate: [AuthGuard, RoleGuard],
      data: { roles: [environment.roles.beneficiary] },
    },
    {
        path: '',
        component: NewsComponent,
        redirectTo: `/`,
        data: { roles: [environment.roles.beneficiary] },
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule],
    providers: [],
})
export class NewsRouterModule { }
