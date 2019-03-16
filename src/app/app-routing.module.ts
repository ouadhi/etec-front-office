import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from './app.authguard';

import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { RequestComponent } from './request/request.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';


const routes: Routes = [
  { path: '',pathMatch: 'full', redirectTo:'/service-catalog'},
  { path: 'service-catalog', component: ServiceCatalogComponent },
  { path: 'my-requests', component: MyRequestsComponent ,canActivate: [AppAuthGuard] },
  { path: 'service-details/:id', component: ServiceDetailsComponent },
  { path: 'request/:id', component: RequestComponent ,canActivate: [AppAuthGuard] },
  { path: 'request-details/:link/:formData', component: RequestDetailsComponent ,canActivate: [AppAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
