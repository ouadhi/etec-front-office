import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../../notifications.service';
import { NotificationsModalComponent } from '../notifications-modal/notifications-modal.component';
@Component({
    selector: 'app-notifications-button',
    templateUrl: './notifications-button.component.html',
    styleUrls: ['./notifications-button.component.scss']
})
export class NotificationsButtonComponent implements OnInit {
    get notificationsCount() {
        return this.notificationsService.notificationsCount;
    }
    constructor(
        private notificationsService: NotificationsService,
        public translate: TranslateService,
        public modalController: ModalController) {

    }
    async openNotifications(event) {
        const notificationsModal = await this.modalController.create({
            cssClass: 'side-modal notifications',
            component: NotificationsModalComponent,
            showBackdrop: false
        });
        return await notificationsModal.present().then(() => {
            this.notificationsService.resetCount();

        });
    }
    ngOnInit() {

    }

}
