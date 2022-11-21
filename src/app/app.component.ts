import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from './shared/components/base.component';

import {
	registerAssessmentComponent,
	registerChartsWrapperComponent,
	registerClassificationIndicatorsComponent,
	registerEditgridResourceComponent,
	registerEventTreeComponent,
	registerFormKeyWrapperComponent,
	registerGroupedTableComponent,
	registerHijriDateComponent,
	registerIndicatorsComponent,
	registerMapComponent,
	registerMasterDetailsResourceComponent,
	registerPDFWrapperComponent,
	registerProccessRequirmentsComponent,
	registerRatingWrapperComponent,
	registerRedirectionButtonComponent,
	registerResourceDropdownWrapperComponent,
	registerStepperComponent,
	registerTableTreeComponent,
	registerTableViewWrapperComponent,
	registerTemplateComponent,
	registerCalenderWrapperComponent,
	registerOrgWrapperComponent,
} from 'src/formio/src/public_api';

import { NavigationStart } from '@angular/router';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	// styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends BaseComponent {
	fullPage$ = of(false);

	constructor(public injector: Injector) {
		super(injector);
		this._registerCustomComponents(injector);
		this.fullPage$ = this.router.events.pipe(
			filter((event) => event instanceof NavigationStart),
			map((event: NavigationStart) => event?.url.includes('reset-password'))
		);
	}

	private _registerCustomComponents(injector) {
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
		registerPDFWrapperComponent(injector);
		registerRatingWrapperComponent(injector);
		registerChartsWrapperComponent(injector);
		registerClassificationIndicatorsComponent(injector);
		registerResourceDropdownWrapperComponent(injector);
		registerEventTreeComponent(injector);
		registerCalenderWrapperComponent(injector);
		registerOrgWrapperComponent(injector);
	}
}
