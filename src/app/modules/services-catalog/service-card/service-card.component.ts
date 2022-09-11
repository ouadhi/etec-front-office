import {
	ChangeDetectionStrategy, Component, Injector, Input,
	ViewEncapsulation
} from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';
@Component({
	selector: 'app-service-card',
	templateUrl: './service-card.component.html',
	// styleUrls: ['./service-card.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent extends BaseComponent {
	@Input() id: number;
	@Input() cardTitle: string;
	@Input() text: string;

	random: number;

	constructor(public injector: Injector) {
		super(injector);
	}
}
