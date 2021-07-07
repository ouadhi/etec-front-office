import { Component, ViewEncapsulation } from '@angular/core';
import { PopoverController } from '@ionic/angular';

/**
 * Sorting Options Popovermenu
 */

@Component({
  selector: 'app-notification-options',
  templateUrl: './notification-options.component.html',
  // styleUrls: ['./notification-options.component.scss']
  encapsulation: ViewEncapsulation.None
})

export class NotificationOptionsComponent {

  constructor(public popoverCtrl: PopoverController) {
  }

  delete() {
    this.popoverCtrl.dismiss('delete');
  }
}
