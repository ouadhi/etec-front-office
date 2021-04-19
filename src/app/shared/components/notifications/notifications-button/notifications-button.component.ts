import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { NotificationsService } from 'src/app/modules/notifications/notifications.service';
import { NotificationsModalComponent } from '../notifications-modal/notifications-modal.component';
import { take } from 'rxjs/operators';
@Component({
    selector: 'app-notifications-button',
    templateUrl: './notifications-button.component.html',
    styleUrls: ['./notifications-button.component.scss']
})
export class NotificationsButtonComponent extends BaseComponent implements OnInit {
    get notificationsCount() {
        return this.notificationsService.notificationsCount;
    }

    constructor(public injector: Injector,
        private notificationsService: NotificationsService,
        public modalController: ModalController) { super(injector); }

    resetCount() {

        this.notificationsService.resetCount();

    }
    ngOnInit() {
        this.sub = this.notificationsService.listenerObserver.subscribe(activity => {
            console.log(activity);
            this.toastrService.show(
                `${this.translateService.instant('a few seconds ago')} <i class="fa fa-comments"></i>`, activity.content, {
                toastClass: 'notification-toast',
                closeButton: true,
                enableHtml: true
            }).onTap
                .pipe(take(1))
                .subscribe(() => {
                    this.notificationsService.updateStatus(activity, true);
                    // this.router.navigate(['/requests/details/' + activity.sourceName]);
                });
        });

    }

}
