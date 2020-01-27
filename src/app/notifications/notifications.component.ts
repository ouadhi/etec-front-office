import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Notifications Dashlet Main Component
 */
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})



export class NotificationsComponent {
  constructor(public translate: TranslateService) {

  }

}
