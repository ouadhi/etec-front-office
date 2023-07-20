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
	registerHtmlEditorComponent,
	registerExecuteVisitComponent,
	registerVisitScheduleComponent,
	registerResourceAutocompleteWrapperComponent,
} from 'src/formio-custom-components/src/public-api';

import { NavigationStart } from '@angular/router';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	// styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends BaseComponent {
	fullPage$ = of(false);
	windowScrolled = false;
	backToTop = environment.backToTop

	constructor(public injector: Injector,
		private viewportScroller: ViewportScroller) {
		super(injector);
		this._registerCustomComponents(injector);
		this.fullPage$ = this.router.events.pipe(
			filter((event) => event instanceof NavigationStart),
			map((event: NavigationStart) => event?.url.includes('reset-password'))
		);
	}

	ngOnInit() {
		window.addEventListener('scroll', () => {
			this.windowScrolled = window.pageYOffset !== 0;
		});
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
		registerHtmlEditorComponent(injector);
		registerExecuteVisitComponent(this.injector);
		registerVisitScheduleComponent(injector);
		registerResourceAutocompleteWrapperComponent(injector);
	}

	scrollTo(elementId) {
		this.viewportScroller.scrollToAnchor(elementId)
	}
}
