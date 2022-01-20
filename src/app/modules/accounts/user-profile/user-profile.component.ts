
import { KeycloakService } from 'keycloak-angular';
import { UserService } from 'src/formio/src/public_api';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

declare let $: any;

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    userInfoObject: any;
    formReady = false;
    id: string;
    submission: any = { data: null };
    url: any = environment.keycloak.url + 'realms/' + environment.keycloak.realm + '/account';

    constructor(private userService: UserService,
        private keycloak: KeycloakService) {
        this.id = 'userprofile';
    }

    async ngOnInit() {
        this.submission.data = await this.userService.getUserData(await this.keycloak.getToken());
        this.submission.data = Object.assign(this.submission.data);
        setTimeout(() => { this.formReady = true; });
    }
}
