import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../../notifications.service';
import { NotificationsModalComponent } from '../notifications-modal/notifications-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
@Component({
    selector: 'app-notifications-button',
    templateUrl: './notifications-button.component.html',
    styleUrls: ['./notifications-button.component.scss']
})
export class NotificationsButtonComponent implements OnInit, OnDestroy {
    get notificationsCount() {
        return this.notificationsService.notificationsCount;
    }
    subscription;
    constructor(
        private notificationsService: NotificationsService,
        public translate: TranslateService,
        public toastr: ToastrService,
        public router: Router,
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

        this.subscription = this.notificationsService.listenerObserver.subscribe(activity => {
            console.log(activity);
            this.toastr.show(
                `${this.translate.instant('a few seconds ago')} <i class="fa fa-comments"></i>`, activity.content, {
                toastClass: 'notification-toast',
                closeButton: true,
                enableHtml: true
            }).onTap
                .pipe(take(1))
                .subscribe(() => {
                    this.notificationsService.updateStatus(activity, true);
                    this.router.navigate(['/request-details/' + activity.sourceName]);
                });
        });

    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
