import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NotificationsModalComponent } from '../notifications/components/notifications-modal/notifications-modal.component';

@Component({
    selector: 'app-notifications-index',
    templateUrl: './notifications-index.component.html',
    styleUrls: ['./notifications-index.component.scss']
})

export class NotificationsIndexComponent implements AfterViewInit {
    @ViewChild(NotificationsModalComponent) NotificationsModalComponent: NotificationsModalComponent;
    constructor() {

    }
    ngAfterViewInit() {
        this.NotificationsModalComponent.itemHeight = 79;
        this.NotificationsModalComponent.divider = false;
        this.NotificationsModalComponent.all = false;
        this.NotificationsModalComponent.title = 'notifications.all';
    }
}
