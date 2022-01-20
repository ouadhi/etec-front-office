import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseComponent } from '../../../shared/components/base.component';
import { InOutAnimation } from 'src/app/core/animations/in-out.animation';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from 'src/formio/src/public_api';
import { RequestsService } from '../requests.service';
import { FeedbackModalComponent } from 'src/app/shared/components/feedback-modal/feedback-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
	selector: 'app-request',
	templateUrl: './request.component.html',
	// styleUrls: ['./request.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [InOutAnimation],
})
export class RequestComponent extends BaseComponent implements OnInit {
	constructor(
		public injector: Injector,
		private userService: UserService,
        private keycloak: KeycloakService,
		private rest: RequestsService,
		public dialog: MatDialog
	) {
		super(injector);
	}

	id: any;
	_id: any;
	serviceId: any;
	caseId: any;
	navParams: any = {};
	formReady = false;
	request: any;

	data: any;
	params;
	isLoggedIn = false;
	submission = { data: {} };

	hasResult = false;
	requestNumber: string;
	requestDate: Date;
	isDraft: false;

	etecData: any = {};

	async ngOnInit() {
		this.formioLoader.loading = false;

		this.isLoggedIn = await this.keycloakService.isLoggedIn();
		this.sub = this.translateService.onLangChange.subscribe(() => this.getData());
		this.sub = this.route.params.subscribe(async (params) => {
			this._id = params['_id'];
			this.id = params['id'];
			this.serviceId = params['serviceId'];
			this.caseId = params['caseId'];
			this.navParams = params;
			this.etecData = await this.userService.getUserData(await this.keycloak.getToken());
			this.submission.data = { serviceId: this.serviceId, ...this.etecData };
			if (
				!this.serviceId ||
				this.serviceId === null ||
				this.serviceId === undefined ||
				this.serviceId === '' ||
				this.serviceId === 'undefined'
			) {
				this.params[0].success = `submission.data = {requesterInfo: {data: response}};`;
			}

			if (this.caseId) this.getData();
			else this.formReady = true;
		});
	}

	getData() {
		this.sub = this.rest.getRequest(this.caseId).subscribe((data) => {
			this.request = data;
			const link = this.request.link;
			const formData = this.request.data;

			this.sub = this.rest
				.getGeneric(`${environment.formio.appUrl}${link}/submission/${formData}`)
				.subscribe((data) => {
					this.submission.data = {
						...this.submission.data,
						...data.data,
						requestId: this.request.id,
						_id: formData,
					};
					this.formReady = true;
				});
		});
	}

	onSubmit(event) {
		// this.toastr.success('', this.translate.instant('SERVICE.SUCCESS'));
		let requestId;
		let requestDate;
		let isDraft;
		Object.keys(event.submission.metadata).forEach((key) => {
			if (event.submission.metadata[key].hasOwnProperty('requestId')) {
				requestId = event.submission.metadata[key].requestNumber;
				requestDate = event.submission.metadata[key].requestDate;
				isDraft = event.submission.metadata[key].state == 'draft';
				return false;
			}
		});

		this.requestNumber = requestId;
		this.requestDate = requestDate;
		this.isDraft = isDraft;
		this.hasResult = true;
		this.openFeedbackDialog();
	}

	openFeedbackDialog() {
		this.dialog.open(FeedbackModalComponent, {
			panelClass: 'panelClass',
			width: '500px',
			data: {
				_usercreator: this.etecData.user_preferred_username,
				_oid: this._id,
			},
		});
	}

	/**
	 * Go Back After Request is sent
	 */
	goBack() {
		if (this.isLoggedIn) {
			this.router.navigate(['/requests/my']);
		} else {
			this.router.navigate(['/']);
		}
	}
}
