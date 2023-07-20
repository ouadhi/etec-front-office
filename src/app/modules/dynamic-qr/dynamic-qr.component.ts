import { Component, Injector, ViewEncapsulation, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ErrorToast, UserService } from 'dp-formio';
import { BaseComponent } from 'src/app/shared/components/base.component';

@Component({
    selector: 'app-dynamic-qr',
    templateUrl: './dynamic-qr.component.html',
    styleUrls: ['./dynamic-qr.component.scss']
})

export class DynamicQrComponent extends BaseComponent implements OnInit {
    formKey: string;
    dataId: string;

    submission: any = {};
    formReady = false;

    constructor(public injector: Injector,
        private userService: UserService,
        private keycloak: KeycloakService) { super(injector); }

    async ngOnInit(): Promise<void> {
        const isLoggedIn = await this.keycloakService.isLoggedIn();
        const etecData = await this.userService.getUserData(isLoggedIn ? await this.keycloak.getToken() : null);
        const params = this.route.snapshot.params;

        this.formKey = params.formKey;
        this.dataId = params.dataId;

        if (!this.formKey || !this.dataId) {
            this.loggerService.error(`Error : formKey and dataId are required`);
            this.showError();
        }

        this.submission.data = {
            ...etecData,
            formKey: this.formKey,
            dataId: this.dataId,
        };
        this.formReady = true;
    }

    private showError() {
        this.toastrService.show(
            this.translateService.instant("generalError"),
            this.translateService.instant("ErrorOccurred"),
            {
                toastClass: "notification-toast",
                closeButton: true,
                enableHtml: true,
                toastComponent: ErrorToast,
            }
        );
        this.goBack();
    }

    goBack() {
        this.router.navigate(['/']);
    }
}