import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { NotificationsService } from '../../notifications.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

/**
 * Notifications Modal Component
 */
@Component({
    selector: 'app-notifications-modal',
    templateUrl: './notifications-modal.component.html',
    styleUrls: ['./notifications-modal.component.scss']
})

export class NotificationsModalComponent implements OnInit {
    dir = 'rtl';
    get notifications() {
        return this.notificationsService.notifications;
    }
    // tslint:disable-next-line:variable-name
    _itemHeight = 76;
    get itemHeight(): number {
        return this._itemHeight;
    }
    set itemHeight(value: number) {
        this._itemHeight = value;
    }
    // tslint:disable-next-line:variable-name
    _divider = true;
    get divider(): boolean {
        return this._divider;
    }
    set divider(value: boolean) {
        this._divider = value;
    }
    // tslint:disable-next-line:variable-name
    _all = true;
    get all(): boolean {
        return this._all;
    }
    set all(value: boolean) {
        this._all = value;
    }
    // tslint:disable-next-line:variable-name
    _title = 'notifications.title';
    get title(): string {
        return this._title;
    }
    set title(value: string) {
        this._title = value;
    }
    constructor(
        private modalController: ModalController,
        private notificationsService: NotificationsService,
        public datePipe: DatePipe,
        public translate: TranslateService
    ) {
        if (this.notifications.length === 0) {
            this.notificationsService.fetchNotifications();
        }

    }

    markAllAsRead() {
        this.notificationsService.markAllAsRead();
    }
    onUpdate(data) {
        if (data.notification) {
            switch (data.action) {
                case 'delete':
                    this.notificationsService.deleteNotification(data.notification);
                    break;
                case 'status':
                    this.notificationsService.updateStatus(data.notification);
                    break;

            }
        }
    }
    trackBy(index, item) {
        return item.id;
    }

    compareDate = (item, itemIndex, items) => {
        if (!this.divider) {
            return null;
        }
        const today = new Date();
        const itemDate = new Date(item.sendDate);
        const isToday = itemDate.getDate() === today.getDate() &&
            itemDate.getMonth() === today.getMonth() &&
            itemDate.getFullYear() === today.getFullYear();
        const prevItem = items[itemIndex - 1];
        let isPrevToday = 0;
        if (prevItem) {
            const NextItemDate = new Date(prevItem.sendDate);
            isPrevToday = NextItemDate.getDate() === today.getDate() &&
                NextItemDate.getMonth() === today.getMonth() &&
                NextItemDate.getFullYear() === today.getFullYear() ? 2 : 1;
        }
        if (!isToday && (isPrevToday === 0 || isPrevToday === 2)) {
            return 'notifications.earlier';
        }
        if (isToday && (isPrevToday === 0 || isPrevToday === 1)) {
            return 'notifications.new';
        }
        return null;

    }

    getItemHeight = () => {
        return this.itemHeight;
    }


    fetchMore(event) {
        this.notificationsService.fetchNotifications().subscribe((data) => {
            event.target.complete();
            if (data.items.length === 0 || data.items.length < this.notificationsService.pageSize) {
                event.target.disabled = true;
            }
        });
    }
    close() {
        this.modalController.dismiss();
    }
    handleOpen(item) {
        this.notificationsService.updateStatus(item, true);
    }
    ngOnInit() {
        this.dir = this.translate.instant('dir');
        this.translate.onLangChange.subscribe((data) => {
            this.dir = this.translate.instant('dir');
        });
    }
}
