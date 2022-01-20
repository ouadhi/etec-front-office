import { Component, Injector, ViewEncapsulation, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from 'src/formio/src/public_api';
import { BaseComponent } from 'src/app/shared/components/base.component';

@Component({
    selector: 'app-formio-demo',
    templateUrl: './formio-demo.component.html',
    styleUrls: ['./formio-demo.component.scss'],
})

export class FormioDemoComponent extends BaseComponent implements OnInit {
    formKey: string;
    submission: any = {};
    extraOptions: any;

    formReady = false;

    constructor(public injector: Injector,
        private userService: UserService,
        private keycloak: KeycloakService) { super(injector); }

    async ngOnInit(): Promise<void> {
        const etecData = await this.userService.getUserData(await this.keycloak.getToken());
        const params = this.route.snapshot.params;
        this.extraOptions = this.route.snapshot.queryParams;

        this.formKey = params.formKey;
        this.submission.data = { ...etecData, ...this.extraOptions };
        this.formReady = true;
    }

}
