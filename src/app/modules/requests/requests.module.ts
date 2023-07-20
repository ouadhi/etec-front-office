import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletFilterComponent } from './my-requests/dashlet-filter/dashlet-filter.component';
import { DashletTableComponent } from './my-requests/dashlet-table/dashlet-table.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { CaseActivitiesComponent } from './request-details/case-activities/case-activities.component';
import { MoreInfoComponent } from './request-details/more-info/more-info.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestQueryComponent } from './request-query/request-query.component';
import { RequestTaskComponent } from './request-task/request-task.component';
import { RequestComponent } from './request/request.component';
import { RequestsRouterModule } from './requests.router.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ResultInfoComponent } from './request/result-info/result-info.component';
import { AnonymousRequestDetailsComponent } from './request-details/anonymous/anonymous-request-details.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';

@NgModule({
	declarations: [
		MyRequestsComponent,
		MyTasksComponent,
		DashletTableComponent,
		DashletFilterComponent,
		RequestComponent,
		RequestDetailsComponent,
		AnonymousRequestDetailsComponent,
		MoreInfoComponent,
		CaseActivitiesComponent,
		RequestQueryComponent,
		RequestTaskComponent,
		ResultInfoComponent,
	],
	imports: [CommonModule, SharedModule, RequestsRouterModule, CarouselModule],
	entryComponents: [],
})
export class RequestsModule {}
