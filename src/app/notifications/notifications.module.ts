import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';
import { NotificationOptionsComponent } from './components/notification-options/notification-options.component';
import { NotificationsButtonComponent } from './components/notifications-button/notifications-button.component';
import { NotificationsModalComponent } from './components/notifications-modal/notifications-modal.component';
import { RequestsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';




/**
 * Notifications Module
 */
@NgModule({
  imports: [
    MatMenuModule,
    MatButtonModule,
    RequestsRoutingModule,
    IonicModule,
    TranslateModule,
    CommonModule,
    MatTooltipModule,
  ],
  entryComponents: [NotificationsModalComponent,NotificationOptionsComponent],
  declarations: [
    NotificationsComponent,
    NotificationsModalComponent,
    NotificationItemComponent,
    NotificationOptionsComponent,
    NotificationsButtonComponent,
    TimeAgoPipe
  ],
  exports: [
    NotificationsModalComponent,
    NotificationsButtonComponent
  ]
})
export class NotificationsModule { }
