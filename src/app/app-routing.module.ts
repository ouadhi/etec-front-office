import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from './app.authguard';

import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { RequestComponent } from './request/request.component';
import { HomeComponent } from './home/home.component';
import { RequestDetailsComponent } from './request-details/request-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'service-catalog', component: ServiceCatalogComponent },
  { path: 'service-details/:id', component: ServiceDetailsComponent },
  { path: 'request/:id', component: RequestComponent,canActivate: [AppAuthGuard] },
  { path: 'request-details/:id', component: RequestDetailsComponent,canActivate: [AppAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
