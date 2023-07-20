import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
    selector: 'app-not-allowed',
    templateUrl: './not-allowed.component.html',
    // styleUrls: ['./not-allowed.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class NotAllowedComponent extends BaseComponent {
    userDetails;
    isFromDashboard = false;

    constructor(public injector: Injector) { super(injector); }

    ngOnInit(): void {
        const url = localStorage.getItem('_previousUrl');
        this.isFromDashboard = ['/', '/service-catalog'].includes(url);
    }

    goBack(): void {
        this.location.back();
    }

    logout() {
        localStorage.removeItem('_previousUrl');
        this.keycloakService.logout();
    }
}
