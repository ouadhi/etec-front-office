import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy, ViewEncapsulation, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NotificationOptionsComponent } from '../notification-options/notification-options.component';

@Component({
  selector: 'app-notification-item',
  // styleUrls: ['./notification-item.component.scss'],
  templateUrl: './notification-item.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotificationItemComponent implements OnChanges, OnDestroy {

  @Input() notification;
  @Output() notificationAction: EventEmitter<any> = new EventEmitter();

  notificationContent = '';
  isArabic;
  sub: Subscription;

  constructor(private popoverCtrl: PopoverController,
    private translateService: TranslateService) {
    this.isArabic = this.translateService.currentLang == 'ar';
    this.sub = this.translateService.onLangChange.subscribe(data => {
      this.isArabic = data.lang == 'ar';

      if (this.notification.notificationContents.length) {
        if (this.isArabic)
          this.notificationContent = this.notification.notificationContents.find(q => q.lang == 'AR').message;
        else this.notificationContent = this.notification.notificationContents.find(q => q.lang == 'EN').message;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.notification && changes.notification.currentValue && changes.notification.currentValue.notificationContents.length) {
      if (this.isArabic)
        this.notificationContent = changes.notification.currentValue.notificationContents.find(q => q.lang == 'AR').message;
      else this.notificationContent = changes.notification.currentValue.notificationContents.find(q => q.lang == 'EN').message;
    }
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
  toggleRead(event) {
    event.stopPropagation();
    this.notificationAction.emit({ action: 'status', notification: this.notification });
  }

  async showOptions(event) {
    event.stopPropagation();
    const popover = await this.popoverCtrl.create({
      component: NotificationOptionsComponent,
      cssClass: 'notification-options',
      event: event,
      showBackdrop: false,
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data && this.notification) {
      this.updateNotification(data);
    }
  }

  updateNotification(data) {
    this.notificationAction.emit({ action: data, notification: this.notification });
  }
}
