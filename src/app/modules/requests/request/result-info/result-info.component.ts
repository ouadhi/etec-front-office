import { Component, Injector, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from "src/app/shared/components/base.component";

@Component({
    selector: 'app-result-info',
    templateUrl: './result-info.component.html',
    // styleUrls: ['./result-info.component.scss']
    encapsulation: ViewEncapsulation.None
})
export class ResultInfoComponent extends BaseComponent {
    @Input() icon: string;
    @Input() actionLabel: string;
    @Output() callback = new EventEmitter();

    constructor(public injector: Injector) { super(injector); }

}