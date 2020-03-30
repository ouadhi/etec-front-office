import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
})

export class NotFoundComponent {
    userDetails;

    constructor(
        public translate: TranslateService) {
    }

}
