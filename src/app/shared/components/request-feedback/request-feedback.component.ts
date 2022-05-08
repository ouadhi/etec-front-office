import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Subscription } from 'rxjs';
import { FormioLoader, UserService } from 'src/formio/src/public_api';

@Component({
	selector: 'app-request-feedback',
	templateUrl: './request-feedback.component.html',
	styleUrls: ['./request-feedback.component.scss'],
})
export class RequestFeedbackComponent implements OnInit, OnDestroy {
	serviceId: any;
	requestId: string;
	feedbackId: string;
	feedbackFormKey: string;
	ratingScale: number;
	formReady = false;
	data: any;
	params;
	isLoggedIn = false;
	submission = { data: {} };
	etecData: any = {};

	private subs: Subscription[] = [];
	set sub(s: Subscription) {
		this.subs.push(s);
	}

	constructor(
		private userService: UserService,
		private keycloak: KeycloakService,
		private route: ActivatedRoute,
		private router: Router,
		private formioLoader: FormioLoader
	) {}

	async ngOnInit() {
		this.formioLoader.loading = false;

		// this.sub = this.translateService.onLangChange.subscribe(() => this.getData());
		this.sub = this.route.params.subscribe(async (params) => {
			this.serviceId = params['serviceId'];
			this.requestId = params['requestId'];
			this.feedbackId = params['feedbackId'];
			this.ratingScale = params['ratingScale'];
			this.feedbackFormKey = params['feedbackFormKey'];

			this.etecData = await this.userService.getUserData(
				this.isLoggedIn ? await this.keycloak.getToken() : null
			);

			this.submission.data = {
				serviceId: this.serviceId,
				requestId: this.requestId,
				feedbackId: this.feedbackId,
				ratingScale: this.ratingScale,
				...this.etecData,
			};

			this.formReady = true;
		});
	}

	goBack() {
		if (this.isLoggedIn) {
			this.router.navigate(['/requests/my']);
		} else {
			this.router.navigate(['/']);
		}
	}

	ngOnDestroy() {
		this.subs.forEach((s) => s.unsubscribe());
		this.subs = [];
	}
}
