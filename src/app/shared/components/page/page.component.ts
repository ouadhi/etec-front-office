import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'app-page',
	templateUrl: './page.component.html',
	// styleUrls: ['./page.component.css']
	encapsulation: ViewEncapsulation.None,
})
export class PageComponent extends BaseComponent implements OnInit {
	@Input() pageTitle?;
	@Input() pageTitleNarrow?;
	@Input() hasBackButton?;

	constructor(public injector: Injector) {
		super(injector);
	}

	ngOnInit() {
		setTimeout(() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		}, 1000);
	}

	back() {
		window.history.back();
	}
}
