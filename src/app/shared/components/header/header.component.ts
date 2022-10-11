import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Formio } from 'formiojs';
import HijriDate from 'hijri-date/lib/safe';
import { combineLatest, from, Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/formio/src/public_api';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	// styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends BaseComponent {
	logo = '';
	loggedIn = false;
	userDetails: { [k: string]: any };
	myDate = new Date();
	newDate: string;
	time: string;
	todaysDataTime: string;
	today = new HijriDate().format('dd mmmm yyyy');

	type = '';
	showDashboardCounters = environment.showDashboardCounters;
	languages = [
		{ name: 'ENGLISH', code: 'en' },
		{ name: 'ARABIC', code: 'ar' },
	];
	selectedLang = this.translateService.currentLang;

	constructor(public injector: Injector, private userService: UserService) {
		super(injector);
		this._registerDelayPlugin();
	}

	ngOnInit() {
		this.switchLangService.changeLang();
		this._prepareDates();

		combineLatest([
			from(this.keycloakService.isLoggedIn()).pipe(
				switchMap((isLogin) => (isLogin ? this._getUserDataToken() : of(isLogin)))
			),
			this.keycloakService.keycloakEvents$.pipe(startWith({})),
		]).subscribe(([DataToken]) => {
			this.loggedIn = !!DataToken;
			this.type = DataToken ? DataToken?.type : '';
		});
	}

	logout() {
		localStorage.setItem('needLogin', 'true');
		localStorage.setItem('_etec_data', null);
		this.keycloakService.logout();
	}

	login() {
		this.keycloakService.login();
	}


	// #region private methods

	private _getUserDataToken(): Observable<any> {
		return combineLatest([
			this.sessionService.loadUserProfile(),
			this.keycloakService.getToken(),
		]).pipe(
			switchMap(([profile, token]) => {
				this.userDetails = profile;
				return from(this.userService.getTokenData(token));
			})
		);
	}

	private _prepareDates(): void {
		this.newDate = formatDate(this.myDate, ' d MMMM y', this.translateService.currentLang);
		this.time = this.myDate.toLocaleString('en-US', { hour: 'numeric', hour12: true });
		this.todaysDataTime = formatDate(this.myDate, ' hh:mm a', 'en-US', '+3');
	}

	private _registerDelayPlugin(): void {
		const DelayPlugin = {
			priority: 100,
			preRequest: (requestArgs) => {
				return new Promise((resolve, reject) => {
					if (this.loggedIn) {
						this.keycloakService.getToken().then((token) => {
							this.loggerService.log(requestArgs);
							if (!requestArgs.opts) {
								requestArgs.opts = {};
							}
							if (!requestArgs.opts.header) {
								requestArgs.opts.header = new Headers();
							}
							if (requestArgs.type !== 'submission' && requestArgs.type !== 'form') {
								if (requestArgs.opts.header.has('authorization')) {
									// requestArgs.opts.header.append('BE-Authorization', `bearer ${token}`);
									requestArgs.opts.header.set('Authorization', `bearer ${token}`);
								} else {
									requestArgs.opts.header.append('Authorization', `bearer ${token}`);
								}
							}
							if (requestArgs.type === 'submission') {
								requestArgs.opts.header.append('content-type', `application/json`);
								requestArgs.opts.header.append('Authorization', `bearer ${token}`);
							}
							resolve(true);
						});
					} else {
						if (!requestArgs.opts) {
							requestArgs.opts = {};
						}
						if (!requestArgs.opts.header) {
							requestArgs.opts.header = new Headers();
						}
						if (requestArgs.type === 'submission') {
							requestArgs.opts.header.append('content-type', `application/json`);
						}
						resolve(true);
					}
				});
			},
		};

		Formio.registerPlugin(DelayPlugin, 'delay');
	}
	//#endregion
}
