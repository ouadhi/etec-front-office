import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationsModalComponent } from '../notifications-modal/notifications-modal.component';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { NotificationsService } from 'src/app/modules/notifications/notifications.service';
@Component({
    selector: 'app-notifications-button',
    templateUrl: './notifications-button.component.html',
    styleUrls: ['./notifications-button.component.scss']
})
export class NotificationsButtonComponent extends BaseComponent implements OnInit, OnDestroy {
    get notificationsCount() {
        return this.notificationsService.notificationsCount;
    }
    subscription;

    constructor(public injector: Injector,
        private notificationsService: NotificationsService,
        public modalController: ModalController) { super(injector); }

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

        /*this.subscription = this.notificationsService.listenerObserver.subscribe(activity => {
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
        });*/

    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
