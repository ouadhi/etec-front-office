import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { NewsDetailsComponent } from "./news-details/news-details.component";
import { NewsComponent } from "./news.component";
import { NewsRouterModule } from "./news.router.module";

@NgModule({
    declarations: [
        NewsComponent,
        NewsDetailsComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        NewsRouterModule,
    ]
})
export class NewsModule { } 
