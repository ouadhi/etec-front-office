import { Injector, OnInit, ViewEncapsulation, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BaseComponent } from './shared/components/base.component';

import {
	registerAssessmentComponent,
	registerEditgridResourceComponent,
	registerFormKeyWrapperComponent,
	registerHijriDateComponent,
	registerIndicatorsComponent,
	registerMapComponent,
	registerMasterDetailsResourceComponent,
	registerProccessRequirmentsComponent,
	registerTableTreeComponent,
	registerTemplateComponent,
	registerGroupedTableComponent,
	registerStepperComponent,
	registerRedirectionButtonComponent,
	registerTableViewWrapperComponent,
} from 'src/formio/src/public_api';

import { NavigationStart } from '@angular/router';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	// styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends BaseComponent implements OnInit {
	fullPage = false;

	constructor(public injector: Injector, public platform: Platform) {
		super(injector);
		registerTableTreeComponent(injector);
		registerAssessmentComponent(injector);
		registerTemplateComponent(injector);
		registerMasterDetailsResourceComponent(injector);
		registerProccessRequirmentsComponent(injector);
		registerMapComponent(injector);
		registerIndicatorsComponent(injector);
		registerHijriDateComponent(injector);
		registerFormKeyWrapperComponent(injector);
		registerEditgridResourceComponent(injector);
		registerGroupedTableComponent(injector);
		registerStepperComponent(injector);
		registerRedirectionButtonComponent(injector);
		registerTableViewWrapperComponent(injector);
		this.sub = this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				this.fullPage = event.url.includes('reset-password');
			}
		});
	}

	ngOnInit() {}
}
