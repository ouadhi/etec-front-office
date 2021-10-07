import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResourcesModule } from 'src/formio/src/lib/modules/resources/resources.module';
import { AccountsComponent } from './accounts.component';
import { AccountsRouterModule } from './accounts.router.module';
import { EntityProfileComponent } from './entity-profile/entity-profile.component';
import { ChangePasswordComponent } from './manage-password/change-password/change-password.component';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import { OtpVerificationComponent } from './manage-password/otp-verification/otp-verification.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        AccountsComponent,
        ProfileComponent,
        EntityProfileComponent,
        ManagePasswordComponent,
        OtpVerificationComponent,
        ChangePasswordComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ResourcesModule,
        AccountsRouterModule,
    ]
})
export class AccountsModule {
}
