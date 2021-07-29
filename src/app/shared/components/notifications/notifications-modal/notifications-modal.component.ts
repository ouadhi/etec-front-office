import { SwitchLangService } from 'src/app/core/services/switch-lang.service';
import { Injector, Input, OnInit } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { NotificationsService } from 'src/app/modules/notifications/notifications.service';
import { BaseComponent } from '../../base.component';
import { distinctUntilChanged, debounceTime, first, take, tap, filter, distinctUntilKeyChanged } from 'rxjs/operators';

/**
 * Notifications Modal Component
 */

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  // styleUrls: ['./notifications-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NotificationsModalComponent extends BaseComponent implements OnInit {
  @Input() hasToolbar = true;

  get notifications() {
    return this.notificationsService.notifications;
  }

  _itemHeight = 79;
  get itemHeight(): number {
    return this._itemHeight;
  }

  set itemHeight(value: number) {
    this._itemHeight = value;
  }

  _divider = true;
  get divider(): boolean {
    return this._divider;
  }

  set divider(value: boolean) {
    this._divider = value;
  }

  _all = true;
  get all(): boolean {
    return this._all;
  }

  set all(value: boolean) {
    this._all = value;
  }

  _title = 'notifications.title';
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  constructor(public injector: Injector,
    private modalController: ModalController,
    private notificationsService: NotificationsService,
    public datePipe: DatePipe) {
    super(injector);
  }

  ngOnInit() {
    if (!this.notificationsService.notifications.length) {
      this.notificationsService.fetchNotifications();
    }
  }

  markAllAsRead() {
    this.notificationsService.markAllAsRead();
  }

  onNotificationAction(data) {
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

  handleOpen(item) {
    // this.modalController.dismiss();
    this.notificationsService.updateStatus(item, true);
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

  /* Get More Notifications Based On Based Size */
  fetchMore(event) {
    this.sub = this.notificationsService.fetchNotifications().subscribe((data) => {
      event.target.complete();
      if (data.items.length === 0 || data.items.length < this.notificationsService.pageSize) {
        event.target.disabled = true;
      }
    });
  }

  close() {
    // this.modalController.dismiss();
  }
}
