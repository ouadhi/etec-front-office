import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ResourcesModule } from "src/formio/src/lib/modules/resources/resources.module";
import { AccountsComponent } from "./accounts.component";
import { AccountsRouterModule } from "./accounts.router.module";
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
    declarations: [
        AccountsComponent,
        ProfileComponent,
    ],
    imports: [ 
        CommonModule,
        SharedModule, 
        ResourcesModule,
        AccountsRouterModule,
    ]
}) 
export class AccountsModule { } 
