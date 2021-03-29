import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
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
        AccountsRouterModule,
    ]
})
export class AccountsModule { } 
