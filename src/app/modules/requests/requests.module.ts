import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DashletFilterComponent } from "./my-requests/dashlet-filter/dashlet-filter.component";
import { DashletTableComponent } from "./my-requests/dashlet-table/dashlet-table.component";
import { MyRequestsComponent } from "./my-requests/my-requests.component";
import { CaseActivitiesComponent } from "./request-details/case-activities/case-activities.component";
import { MoreInfoComponent } from "./request-details/more-info/more-info.component";
import { RequestDetailsComponent } from "./request-details/request-details.component";
import { RequestInfoDialogComponent } from "./request-info/request-info.dialog";
import { RequestQueryComponent } from "./request-query/request-query.component";
import { RequestTaskComponent } from "./request-task/request-task.component";
import { RequestComponent } from "./request/request.component";
import { RequestsRouterModule } from "./requests.router.module";

@NgModule({
    declarations: [
        MyRequestsComponent,
        DashletTableComponent,
        DashletFilterComponent,
        RequestComponent,
        RequestDetailsComponent,
        MoreInfoComponent,
        CaseActivitiesComponent,
        RequestQueryComponent,
        RequestTaskComponent,

        RequestInfoDialogComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RequestsRouterModule,
    ],
    entryComponents: [
        RequestInfoDialogComponent,
    ]
})
export class RequestsModule { }
