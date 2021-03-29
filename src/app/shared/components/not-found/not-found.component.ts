import { Component, Injector } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
})

export class NotFoundComponent extends BaseComponent {
    userDetails;

    constructor(public injector: Injector) { super(injector); }

}
