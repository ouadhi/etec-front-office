import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    // styleUrls: ['./not-found.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class NotFoundComponent extends BaseComponent {
    userDetails;

    constructor(public injector: Injector) { super(injector); }

}
