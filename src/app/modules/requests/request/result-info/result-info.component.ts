import { Component, Injector, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from "src/app/shared/components/base.component";

@Component({
    selector: 'app-result-info',
    templateUrl: './result-info.component.html',
    styleUrls: ['./result-info.component.scss']
})
export class ResultInfoComponent extends BaseComponent {
    @Input() icon: string;
    @Input() actionLabel: string;
    @Output() callback = new EventEmitter();

    constructor(public injector: Injector) { super(injector); }

}