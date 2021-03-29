import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ServiceCardComponent } from "./service-card/service-card.component";
import { ServiceCatalogComponent } from "./service-catalog/service-catalog.component";
import { ServiceDetailsComponent } from "./service-details/service-details.component";
import { ServicesCatalogRouterModule } from "./services-catalog.router.module";

@NgModule({
    declarations: [
        ServiceCardComponent,
        ServiceCatalogComponent,
        ServiceDetailsComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ServicesCatalogRouterModule,
    ]
})
export class ServicesCatalogModule { }
