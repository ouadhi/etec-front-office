import { Component, OnInit, OnDestroy, Injector, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { NotificationsService } from 'src/app/modules/notifications/notifications.service';
import { NotificationsModalComponent } from '../notifications-modal/notifications-modal.component';
import { take } from 'rxjs/operators';
import { NotificationToast } from 'src/formio/src/lib/modules/toast/notification-toast/notification-toast.component';
import { ErrorToast } from 'src/formio/src/lib/modules/toast/error-toast/error-toast.component';
import { SuccessToast } from 'src/formio/src/lib/modules/toast/success-toast/success-toast.component';
@Component({
    selector: 'app-notifications-button',
    templateUrl: './notifications-button.component.html',
    // styleUrls: ['./notifications-button.component.scss']
    encapsulation: ViewEncapsulation.None
})
export class NotificationsButtonComponent extends BaseComponent implements OnInit {
    get notificationsCount() {
        return this.notificationsService.notificationsCount;
    }
    get notificationsData() {
        return this.notificationsService.notifications;
    }
    isMenuOppened = false;

    constructor(public injector: Injector,
        private notificationsService: NotificationsService,
        public modalController: ModalController) { super(injector); }

    resetCount() {
        this.notificationsService.resetCount();
        if (!this.notificationsService.notifications.length) {
            this.notificationsService.fetchNotifications();
        }

    }
    ngOnInit() {
        this.sub = this.notificationsService.listenerObserver.subscribe(activity => {
            console.log(activity);

            let content = '';
            if (activity.notificationContents.length) {
                if (this.translateService.currentLang == 'ar')
                    content = activity.notificationContents.find(q => q.lang == 'AR').message;
                else content = activity.notificationContents.find(q => q.lang == 'EN').message;
            }

            this.toastrService.show(
                `${this.translateService.instant('a few seconds ago')} <i class="fa fa-comments"></i>`, content ? content.trim() : '', {
                toastClass: 'notification-toast',
                closeButton: true,
                enableHtml: true,
                toastComponent: NotificationToast
            }).onTap
                .pipe(take(1))
                .subscribe(() => {
                    this.notificationsService.updateStatus(activity, true);
                    this.router.navigate(['/requests/details/' + activity.sourceId]);
                });
        });
    }

    toggleMenu(isOppen) {
        this.isMenuOppened = isOppen;
    }

    test() {
        // this.toastrService.show(`${this.translateService.instant('a few seconds ago')} <i class="fa fa-comments"></i>`,
        //     'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ',
        //     {
        //         toastClass: 'notification-toast',
        //         closeButton: true,
        //         enableHtml: true,
        //         timeOut: 10000000,
        //         toastComponent: NotificationToast
        //     });

        // this.toastrService.show('هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ',
        //     'تمت العملية بنجاح',
        //     {
        //         toastClass: 'notification-toast',
        //         closeButton: true,
        //         enableHtml: true,
        //         timeOut: 10000000,
        //         toastComponent: SuccessToast
        //     });

        // this.toastrService.show('هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ',
        //     'حدث خطأ ما',
        //     {
        //         toastClass: 'notification-toast',
        //         closeButton: true,
        //         enableHtml: true,
        //         timeOut: 10000000,
        //         toastComponent: ErrorToast
        //     });
    }

}
