import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakProfile } from 'keycloak-js';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
})

export class NotFoundComponent {
    userDetails: KeycloakProfile;

    constructor(
        public translate: TranslateService) {
    }

}
