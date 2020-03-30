import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-not-allowed',
    templateUrl: './not-allowed.component.html',
    styleUrls: ['./not-allowed.component.scss'],
})

export class NotAllowedComponent {
    userDetails;

    constructor(
        public translate: TranslateService) {
    }

}
