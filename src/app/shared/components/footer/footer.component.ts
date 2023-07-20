import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FooterComponent extends BaseComponent {
	footerContent$ = combineLatest([
		this.configService.footerTemplate$,
		this.translateService.onLangChange,
	]).pipe(map(([tpl]) => this._prepareTemplate(tpl as any)));

	constructor(public injector: Injector) {
		super(injector);
	}
	private _prepareTemplate(tpl: string) {
		return tpl.replace(/{#(.*?)#}/g, (match, p1) => this.translateService.instant(p1));
	}
}
