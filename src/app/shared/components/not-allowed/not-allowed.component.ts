import { Component, Injector } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
    selector: 'app-not-allowed',
    templateUrl: './not-allowed.component.html',
    styleUrls: ['./not-allowed.component.scss'],
})

export class NotAllowedComponent extends BaseComponent {
    userDetails;

    constructor(public injector: Injector) { super(injector); }

}
