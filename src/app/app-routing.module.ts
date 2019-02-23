import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { RequestComponent } from './request/request.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { RequestDetailsComponent } from './request-details/request-details.component';


const routes: Routes = [
  { path: 'service-catalog', component: ServiceCatalogComponent },
  { path: 'service-details/:id', component: ServiceDetailsComponent },
  { path: 'request/:id', component: RequestComponent },
  { path: 'my-requests', component: MyRequestsComponent },
  { path: 'request-details/:id', component: RequestDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
