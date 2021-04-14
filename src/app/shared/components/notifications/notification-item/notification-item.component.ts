import {Component, Input, EventEmitter, Output} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {NotificationOptionsComponent} from '../notification-options/notification-options.component';

@Component({
  selector: 'app-notification-item',
  styleUrls: ['./notification-item.component.scss'],
  templateUrl: './notification-item.component.html'
})

export class NotificationItemComponent {

  @Input() notification;
  @Output() notificationAction: EventEmitter<any> = new EventEmitter();

  constructor(private popoverCtrl: PopoverController) {
  }

  toggleRead(event) {
    event.stopPropagation();
    this.notificationAction.emit({action: 'status', notification: this.notification});
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
    const {data} = await popover.onDidDismiss();
    if (data && this.notification) {
      this.updateNotification(data);
    }
  }

  updateNotification(data) {
    this.notificationAction.emit({action: data, notification: this.notification});
  }
}
