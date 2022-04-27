import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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
	showFeedback = false;
	feedbackFormKey: string;
	feedbackId: string;

	updateTask = 'SERVICE.beneficiaryTask';
	taskName = '';

	currentRequestTask: any;
	isLoggedIn = false;

	user: any;
	isAdmin = false;

	async ngOnInit() {
		this.isLoggedIn = await this.keycloakService.isLoggedIn();
		this.user = await this.userService.getUserData(
			this.isLoggedIn ? await this.keycloakService.getToken() : null
		);
		this.isAdmin = this.user?.currentUser_groups?.includes('Admins');
		this.sub = this.route.params.subscribe((params) => {
			this.id = params.id;
			this.getData();
		});

		this.translateService.onLangChange.subscribe(() => {
			this.getData();
		});

		this.sub = this.notificationsService.listenerObserver.subscribe((activity) => {
			if (this.id == activity.data.id) {
				this.getData();
			}
		});
	}

	private getData() {
		this.sub = this.rest.getRequest(this.id).subscribe(
			(data) => {
				this.processInstanceId = data.procInstID;
				this.serviceId = data.serviceId;
				if (this.processInstanceId)
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
			(err) => console.log(err),
			() => {
				this.checkRequestFeedback();
			}
		);
	}

	checkRequestFeedback() {
		this.rest.checkRequestFeedback(this.serviceId, this.id).subscribe(
			(res: any) => {
				if (res && res[0] != null) {
					this.feedbackFormKey = res[0].formKey;
					this.feedbackId = res[0].id;
					this.showFeedback = true;
				}
			},
			(err) => {
				console.log(err);
			}
		);
	}

	openFeedbackPage() {
		const url = `/feedback/${this.serviceId}/${this.id}/requestfeedback/100`;
		window.open(url, '_blank');
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
