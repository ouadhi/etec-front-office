import { Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseComponent } from '../../../shared/components/base.component';
import { InOutAnimation } from 'src/app/core/animations/in-out.animation';
import { KeycloakService } from 'keycloak-angular';
import { ErrorToast, FormioComponent, SuccessToast, UserService } from 'dp-formio';
import { RequestsService } from '../requests.service';
import { FeedbackModalComponent } from 'src/app/shared/components/feedback-modal/feedback-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';
@Component({
	selector: 'app-request',
	templateUrl: './request.component.html',
	// styleUrls: ['./request.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [InOutAnimation],
})
export class RequestComponent extends BaseComponent implements OnInit {
	routeState = null;
	constructor(
		public injector: Injector,
		private userService: UserService,
		private keycloak: KeycloakService,
		private rest: RequestsService,
		public dialog: MatDialog
	) {
		super(injector);
		const state = this.router.getCurrentNavigation().extras.state;
		this.routeState = state ? state : "";
	}

	@ViewChild(FormioComponent) formComponent: FormioComponent;
	enableLock = false;

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
	isAdmin = false;
	submission = { data: {} };

	hasResult = false;
	requestNumber: string;
	requestDate: Date;
	isDraft: false;

	etecData: any = {};
	user: any;

	async ngOnInit() {
		this.formioLoader.loading = false;
		this.isLoggedIn = await this.keycloakService.isLoggedIn();
		this.user = await this.userService.getUserData(
			this.isLoggedIn ? await this.keycloakService.getToken() : null
		);
		this.isAdmin = this.user?.currentUser_groups?.includes('Admins');

		this.sub = this.translateService.onLangChange.subscribe(() => this.getData());
		this.sub = this.route.params.subscribe(async (params) => {
			this._id = params['_id'];
			this.id = params['id'];
			this.serviceId = params['serviceId'];
			this.caseId = params['caseId'];
			this.navParams = params;
			this.etecData = await this.userService.getUserData(
				this.isLoggedIn ? await this.keycloak.getToken() : null
			);
			this.submission.data = { serviceId: this.serviceId, ...this.etecData };
			if (this.routeState) {
				for (let k in this.routeState) {
					this.submission.data[k] = this.routeState[k]
				}
			}
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

		if (environment.showFeedbackButton) this.openFeedbackDialog();
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

	formLoad(event) { }

	get formReadOnly() {
		return (
			this.enableLock &&
			(!this.request?.requestLocksDTO ||
				this.request?.requestLocksDTO?.process == 'UNLOCKED' ||
				(this.request?.requestLocksDTO?.process == 'LOCKED' &&
					this.request?.requestLocksDTO?.processedBy != this.user?.currentUser_preferred_username))
		);
	}
	beforeSetForm(formio: FormioComponent, form?: any) {
		this.enableLock = !!this.request && (form as any)?.properties?.enableLock == 'true';
		formio.readOnly = this.formReadOnly;
		// formio.viewOnly = this.formReadOnly;
	}

	lock() {
		this.formioLoader.loading = true;
		this.sub = this.rest.lockRequest(this.request.id, 'receive a task').subscribe(
			(data) => {
				this.handleLock();
				this.formioLoader.loading = false;
			},
			(error) => {
				if (error.status == 200) {
					this.handleLock();
				} else {
					this.showToast('ErrorOccurred', 'generalError', ErrorToast);
				}
				this.formioLoader.loading = false;
			}
		);
	}
	private handleLock() {
		if (!this.request.requestLocksDTO) this.request.requestLocksDTO = {};
		this.request.requestLocksDTO.process = 'LOCKED';
		this.request.requestLocksDTO.processDate = new Date();
		this.request.requestLocksDTO.processedBy = this.user.currentUser_preferred_username;
		this.request.requestLocksDTO.processorFullName = this.user.currentUser_name;
		this.formReady = false;
		setTimeout(() => (this.formReady = true));

		this.showToast(
			'OperationDone',
			'requestLock.The request has been locked successfully',
			SuccessToast
		);
	}
	unlock() {
		this.formioLoader.loading = true;
		this.sub = this.rest.unlockRequest(this.request.id, 'receive a task').subscribe(
			(data) => {
				this.handleunLock();
				this.formioLoader.loading = false;
			},
			(error) => {
				if (error.status == 200) {
					this.handleunLock();
				} else {
					this.showToast('ErrorOccurred', 'generalError', ErrorToast);
				}
				this.formioLoader.loading = false;
			}
		);
	}
	private handleunLock() {
		if (!this.request.requestLocksDTO) this.request.requestLocksDTO = {};
		this.request.requestLocksDTO.process = 'UNLOCKED';
		this.showToast(
			'OperationDone',
			'requestLock.The request has been unlocked successfully',
			SuccessToast
		);
		this.formReady = false;
		setTimeout(() => (this.formReady = true));
	}
	private showToast(title: string, message: string, component: ComponentType<any>) {
		this.toastrService.show(
			this.translateService.instant(message),
			this.translateService.instant(title),
			{
				toastClass: 'notification-toast',
				closeButton: true,
				enableHtml: true,
				toastComponent: component,
			}
		);
	}
}
