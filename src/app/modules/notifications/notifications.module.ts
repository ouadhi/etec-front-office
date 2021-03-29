import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationsRouterModule } from './notifications.router.module';
import { NotificationsIndexComponent } from './notifications-index/notifications-index.component';

/**
 * Notifications Module
 */
@NgModule({
  declarations: [
    NotificationsIndexComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotificationsRouterModule,
  ]
})
export class NotificationsModule { }
