import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AdsDetailsComponent } from "./ads-details/ads-details.component";
import { AdsComponent } from './ads.component';
import { AdsRouterModule } from "./ads.router.module";

@NgModule({
    declarations: [
        AdsComponent,
        AdsDetailsComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AdsRouterModule,
    ]
})
export class AdsModule { } 
