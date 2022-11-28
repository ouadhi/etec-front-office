import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { from, of } from 'rxjs';
import { finalize, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { environment } from 'src/environments/environment';
import { ErrorToast, FormioLoader, SuccessToast, UserService } from 'src/formio/src/public_api';
import { NotificationsService } from '../../notifications/notifications.service';
import { CaseActivityService } from '../case-activities.service';
import { RequestsService } from '../requests.service';

@Component({
	selector: 'app-request-details',
	templateUrl: './request-details.component.html',
	// styleUrls: ['./request-details.component.scss']
	encapsulation: ViewEncapsulation.None,
	providers: [FormioLoader],
})
export class RequestDetailsComponent extends BaseComponent implements OnInit {
	constructor(
		public injector: Injector,
		private rest: RequestsService,
		public caseActivity: CaseActivityService,
		public userService: UserService,
		private notificationsService: NotificationsService
	) {
		super(injector);
	}
	isRtl$ = of(false);
	id: string;
	serviceId: string;
	processInstanceId: string;
	tasks = [];
	link: any;
	formData: any;
	submission: any;
	moreInfo: any;
	cmmnId: any;
	requestTask = [];
	data: any;
	formReady = false;
	hasTask: any;
	params;
	request;
	showFeedbackButton = false;
	feedbackId: string;
	feedbackFormKey: string;
	showLoader: boolean;
	feedbackFormReady: boolean;
	showFeedbackDialog: boolean;
	feedbackSubmission = { data: {} };

	updateTask = 'SERVICE.beneficiaryTask';
	taskName = '';

	currentRequestTask: any;
	isLoggedIn = false;
	loading = true;
	user: any;
	isAdmin = false;

	async ngOnInit() {
		this.isRtl$ = this.translateService.onLangChange.pipe(
			map((data) => data.lang == 'ar'),
			shareReplay(),
			tap((rs) => {
				this.getData();
			})
		);
		this.sub = from(this.keycloakService.isLoggedIn())
			.pipe(
				tap((res) => {
					this.isLoggedIn = res;
				}),
				switchMap((isLoggedIn) => from(isLoggedIn ? this.keycloakService.getToken() : null)),
				switchMap((token) => this.userService.getUserData(token))
			)
			.subscribe((userData) => {
				this.user = userData;
				this.isAdmin = userData?.currentUser_groups?.includes('Admins');
			});

		this.route.params.subscribe((params) => {
			this.id = params.id;
			this.getData();
		});

		this.sub = this.notificationsService.listenerObserver.subscribe((activity) => {
			if (this.id == activity.data.id) {
				this.getData();
			}
		});
	}

	private getData() {
		this.sub = this.rest
			.getRequest(this.id)
			.pipe(
				finalize(() => {
					this.formioLoader.loading = false;
				})
			)
			.subscribe(
				(data) => {
					this.loading = false;
					this.processInstanceId = data.procInstID;
					this.serviceId = data.serviceId;
					if (this.processInstanceId) {
						this.sub = this.rest
							.getTaskByProcessInstanceId({ processInstanceId: this.processInstanceId })
							.subscribe((data) => {
								this.tasks = data;

								if (data.length) {
									const taskName = `taskTitle.${data[0].task.taskDefinitionKey}`;
									this.sub = this.translateService
										.get([taskName, this.updateTask])
										.subscribe((keys) => {
											if (keys[taskName] != taskName) {
												this.taskName = `${keys[taskName]}`;
											} else {
												this.taskName = `${keys[taskName]}`;
												// this.taskName = keys[this.updateTask];
											}
										});
								}
							});
					}
					this.request = data;
					this.link = this.request.link;
					this.formData = this.request.data;
					this.cmmnId = this.request.cmmnId;

					this.sub = this.rest
						.getGeneric(`${environment.formio.appUrl}${this.link}/submission/${this.formData}`)
						.subscribe((data) => {
							this.submission = data;
							this.moreInfo =
								data.data.moreInfo && Object.keys(data.data.moreInfo).length
									? data.data.moreInfo
									: null;
							/*this.params = [
          {
            url: environment.beneficiaryApi.api,
            success: `submission.data = {... submission.data, requesterInfo: {data: response}};`,
            parallel: true
          }
        ];*/
							this.formReady = true;
						});
				},
				(err) => console.error(err),
				() => {
					this.checkRequestFeedback();
				}
			);
	}

	checkRequestFeedback() {
		this.rest.checkRequestFeedback(this.serviceId, this.id).subscribe(
			(res: any) => {
				if (res && res[0] != null) {
					this.feedbackId = res[0].id;
					this.feedbackFormKey = res[0].formKey;
					this.feedbackSubmission.data = {
						feedbackId: this.feedbackId,
						requestId: this.id,
						serviceId: this.serviceId,
						ratingScale: res[0].ratingScale,
					};
					this.showFeedbackButton = true;
				}
			},
			(err) => {
				this.showFeedbackButton = false;
				console.log(err);
			}
		);
	}

	openFeedbackDialog() {
		this.feedbackFormReady = false;
		this.showFeedbackDialog = true;
		setTimeout(() => {
			this.feedbackFormReady = true;
		});
	}

	goToFeedbackPage() {
		const url = `/feedback/${this.feedbackId}/${this.id}`;
		window.open(url, '_blank');
	}

	afterFeedbackSubmitted(event) {
		if (event && event.submission && event.submission.data) {
			this.showToast('', this.translateService.instant('Feedback is sent successfully'), false);
			this.showFeedbackDialog = false;
			this.showFeedbackButton = false;
		}
	}

	private showToast(title?: string, message?: string, isError?: boolean) {
		this.toastrService.show(message, title, {
			toastClass: 'notification-toast',
			closeButton: true,
			enableHtml: true,
			toastComponent: isError ? ErrorToast : SuccessToast,
		});
	}

	unlock() {
		this.formioLoader.loading = true;
		this.sub = this.rest.unlockRequest(this.request.id).subscribe(
			(data) => {
				if (!this.request.requestLocksDTO) this.request.requestLocksDTO = {};
				this.request.requestLocksDTO.process = 'UNLOCKED';
				this.showSuccessToast();
				this.formioLoader.loading = false;
			},
			(error) => {
				if (error.status == 200) {
					if (!this.request.requestLocksDTO) this.request.requestLocksDTO = {};
					this.request.requestLocksDTO.process = 'UNLOCKED';
					this.showSuccessToast();
				} else {
					this.toastrService.show(
						this.translateService.instant('generalError'),
						this.translateService.instant('ErrorOccurred'),
						{
							toastClass: 'notification-toast',
							closeButton: true,
							enableHtml: true,
							toastComponent: ErrorToast,
						}
					);
				}
				this.formioLoader.loading = false;
			}
		);
	}

	handleAction(event) {
		if (event.type === 'task') {
			if (this.tasks && this.tasks.length) {
				this.router.navigate([
					'/requests/task',
					this.tasks[0].task.taskDefinitionKey,
					this.tasks[0].task.id,
					this.request.caseId,
					this.route.snapshot.params.id,
				]);
			} else {
				this.router.navigate([
					'/requests/task',
					this.currentRequestTask.taskDefinitionKey,
					event.activity.taskId,
					this.request.caseId,
					this.route.snapshot.params.id,
				]);
			}
		}
	}

	showTask(event) {
		this.hasTask = event;
		this.sub = this.caseActivity.getRequestTask(this.hasTask.taskId).subscribe((data) => {
			this.currentRequestTask = data;
		});
	}

	private showSuccessToast() {
		this.toastrService.show(
			this.translateService.instant('requestLock.The request has been unlocked successfully'),
			this.translateService.instant('OperationDone'),
			{
				toastClass: 'notification-toast',
				closeButton: true,
				enableHtml: true,
				toastComponent: SuccessToast,
			}
		);
	}
}
