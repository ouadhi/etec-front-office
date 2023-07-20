import { HttpParams } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { ErrorToast, FormioLoader, UserService } from 'dp-formio';
import { Utils } from 'formiojs';

import { Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { environment } from 'src/environments/environment';
import { FormioComponent, SuccessToast } from 'dp-formio';
import { CaseActivityService } from '../case-activities.service';
import { forkJoin } from 'rxjs';
import { RequestsService } from '../requests.service';
import { ComponentType } from 'ngx-toastr';
declare var $: any;
/**
 * Main Task Component
 */
@Component({
	selector: 'app-request-task',
	templateUrl: './request-task.component.html',
	// styleUrls: ['./request-task.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [FormioLoader],
})
export class RequestTaskComponent extends BaseComponent implements OnInit {
	@ViewChild(FormioComponent) formComponent: FormioComponent;

	updateTask = 'SERVICE.beneficiaryTask';
	proccessName = '';

	task: any = {};
	submission: any = {};
	public max = 65;
	public mainWidth = 65;
	public seperator = true;
	public showComments = true;
	public showCommentsPopup = false;
	form = {
		formKey: '',
		readOnly: false,
		version: {},
		ready: false,
	};
	params;

	request: any;
	user: any;
	isAdmin = false;

	enableLock = false;
	assignee = null;

	loading = true;
	/*
  submitPromise: Promise<any>;
  submitPromiseResolve: any;
*/

	constructor(
		public injector: Injector,
		private rest: RequestsService,
		public modalController: ModalController,
		private userService: UserService,
		private keycloak: KeycloakService,
		public caseActivity: CaseActivityService
	) {
		super(injector);
	}

	/**
	 * Go Back After Task is completed and return navigation promise
	 */
	goBack() {
		/* return this.router.navigate(['tasks',
	   ...(this.route.parent.snapshot.params.filterId ? [this.route.parent.snapshot.params.filterId] : [])]);*/
		this.location.back();
	}

	/**
	 * On Form Submit Event Callback
	 *  @param submission
	 *  Submission Object
	 */
	onSubmit(submission) {
		this.toastrService.show(
			this.translateService.instant('SERVICE.BENEFICIARY_TASK_SUCCESS'),
			this.translateService.instant('OperationDone'),
			{
				toastClass: 'notification-toast',
				closeButton: true,
				enableHtml: true,
				toastComponent: SuccessToast,
			}
		);

		if (
			environment.taskRedirection &&
			this.formComponent?.form['properties']?.nextTaskRedirection === 'true'
		) {
			const conditionalValue = this.formComponent?.form['properties']?.conditional;
			let conditionalData;
			if (conditionalValue) {
				conditionalData = Utils.evaluate(conditionalValue, { submission: submission.submission });
				if (conditionalData === true) {
					let nextRoute = this.formComponent?.form['properties']?.nextRoute;
					const value = this.formComponent?.form['properties']?.nextTaskParams;
					let data;
					if (value) {
						data = Utils.evaluate(value, { submission: submission.submission });
					}
					this.router.navigateByUrl(nextRoute, { state: data ? { ...data } : '' });
				} else {
					this.goBack();
				}
			} else if (conditionalValue === null || conditionalValue === undefined) {
				let nextRoute = this.formComponent?.form['properties']?.nextRoute;
				const value = this.formComponent?.form['properties']?.nextTaskParams;
				let data;
				if (value) {
					data = Utils.evaluate(value, { submission: submission.submission });
				}
				this.router.navigateByUrl(nextRoute, { state: data ? { ...data } : '' });
			} else {
				this.goBack();
			}
		} else {
			this.goBack();
		}
	}

	customSubmit(submission) {
		const send = Object.assign({}, this.formComponent.submission);
		send.data.saveAndSend = true;
		this.formComponent.submitForm(send);
	}

	formLoad(formSettings) {
		this.isLocked();
		this.formComponent.formio.on('LockFile', () => {
			if (this.request?.requestLocksDTO?.process != 'LOCKED') {
				this.request.requestLocksDTO = {
					process: 'LOCKED',
					processedBy: this.user?.currentUser_preferred_username,
					processorFullName: this.user.currentUser_name,
					processDate: new Date(),
				};
			}
		});
		setTimeout(() => {
			if (formSettings.properties && eval(formSettings.properties.hideSubmit)) {
				document.getElementsByName('data[submit]')[0].style.display = 'none';
				document.getElementById('custom-actions').style.display = 'block';
			}

			if (this.enableLock)
				document
					.getElementsByName('data[submit]')
					.forEach((e) => (e.style.display = this.formReadOnly ? 'none' : 'block'));

			$('.input-group:has(.input-group-addon.input-group-prepend)').css('display', 'block');
		});
	}

	/**
	 * ngOnInit: on init subscribe to route changes
	 */
	async ngOnInit() {
		const isLoggedIn = await this.keycloakService.isLoggedIn();

		this.user = await this.userService.getUserData(
			isLoggedIn ? await this.keycloak.getToken() : null
		);
		this.isAdmin = this.user?.currentUser_groups?.includes('Admins');

		this.sub = this.route.params.subscribe((params) => {
			const calls = [this.caseActivity.getRequestTask(params.taskId)];
			if (isLoggedIn) calls.push(this.rest.getRequest(params.requestId));

			this.sub = forkJoin(calls).subscribe(async (result) => {
				const data = result[0];
				this.assignee = data.assignee;
				if (isLoggedIn) this.request = result[1];
				this.isLocked();

				if (data.formKey) {
					const processDefinitionId = data.processDefinitionId.split(':')[0];
					const requestName = `${processDefinitionId}`;
					const taskName = `taskTitle.${data.taskDefinitionKey}`;
					this.sub = this.translateService
						.get([requestName, taskName, this.updateTask])
						.subscribe((keys) => {
							if (keys[requestName] != requestName && keys[taskName] != taskName) {
								this.proccessName = `${keys[requestName]} - ${keys[taskName]}`;
							} else {
								this.proccessName = `${keys[requestName]} - ${keys[taskName]}`;
								// this.proccessName = keys[this.updateTask];
							}
						});

					this.form.ready = false;

					const etecData = await this.userService.getTaskUserData(
						isLoggedIn ? await this.keycloak.getToken() : null
					);
					this.submission.data = { ...etecData, taskParams: params };
					if (isLoggedIn) {
						this.params = [
							{
								url: `${environment.gateway}${
									environment.endpoints.humanTask
								}${data.formKey.replace('{caseId}', params.caseId)}`,
								parallel: false,
								success: `submission.data = {...response.data,...submission.data, taskId:"${params.taskId}", requestId:"${params.requestId}"};`,
							},
						];
					}
					this.form.formKey = data.formKey.split('/')[2];

					setTimeout(() => {
						this.form.ready = true;
						this.loading = false;
					}, 0);
				}
			});
		});
	}
	unlock() {
		this.formioLoader.loading = true;
		this.sub = this.rest.unlockRequest(this.request.id).subscribe(
			(data) => {
				if (!this.request.requestLocksDTO) this.request.requestLocksDTO = {};
				this.request.requestLocksDTO.process = 'UNLOCKED';
				this.showToast(
					'OperationDone',
					'requestLock.The request has been unlocked successfully',
					SuccessToast
				);
				this.isLocked(true);
				this.formioLoader.loading = false;
			},
			(error) => {
				if (error.status == 200) {
					if (!this.request.requestLocksDTO) this.request.requestLocksDTO = {};
					this.request.requestLocksDTO.process = 'UNLOCKED';
					this.showToast(
						'OperationDone',
						'requestLock.The request has been unlocked successfully',
						SuccessToast
					);
				} else {
					this.showToast('ErrorOccurred', 'generalError', ErrorToast);
				}
				this.isLocked(true);
				this.formioLoader.loading = false;
			}
		);
	}

	isLocked(notify = false) {
		const isLocked =
			this.request?.requestLocksDTO?.process == 'LOCKED' &&
			this.request?.requestLocksDTO?.processedBy != this.user?.currentUser_preferred_username;

		if (this.formComponent?.formio) {
			this.formComponent.formio.isLocked = isLocked;
			if (notify) this.formComponent.formio.emit('changeLockFile', null);
			const nestedForms = Utils.searchComponents(this.formComponent.formio.components, {
				type: 'form',
			});
			nestedForms.forEach((form) => {
				if (form?.subForm) {
					form.subForm.isLocked = isLocked;
					if (notify) form.subForm.emit('changeLockFile', null);
				}
			});
		}
		return isLocked;
	}

	get formReadOnly() {
		// must be get task and check task.assigne
		return (
			this.enableLock &&
			!this.assignee &&
			(!this.request?.requestLocksDTO ||
				this.request?.requestLocksDTO?.process == 'UNLOCKED' ||
				(this.request?.requestLocksDTO?.process == 'LOCKED' &&
					this.request?.requestLocksDTO?.processedBy != this.user?.currentUser_preferred_username))
		);
	}
	beforeSetForm(formio: FormioComponent, form?: any) {
		this.enableLock = (form as any)?.properties?.enableLock == 'true';
		// formio.readOnly = this.formReadOnly;
		// formio.viewOnly = this.formReadOnly;
	}
	lockTask() {
		this.formioLoader.loading = true;
		this.sub = this.rest.lockRequest(this.request.id, 'receive a task').subscribe(
			(data) => {
				this.handleLockTask();
				this.formioLoader.loading = false;
			},
			(error) => {
				if (error.status == 200) {
					this.handleLockTask();
				} else {
					this.showToast('ErrorOccurred', 'generalError', ErrorToast);
				}
				this.formioLoader.loading = false;
			}
		);
	}
	private handleLockTask() {
		if (!this.request.requestLocksDTO) this.request.requestLocksDTO = {};
		this.request.requestLocksDTO.process = 'LOCKED';
		this.request.requestLocksDTO.processDate = new Date();
		this.request.requestLocksDTO.processedBy = this.user.currentUser_preferred_username;
		this.request.requestLocksDTO.processorFullName = this.user.currentUser_name;
		this.form.ready = false;
		setTimeout(() => (this.form.ready = true));

		this.showToast(
			'OperationDone',
			'requestLock.The request has been locked successfully',
			SuccessToast
		);
	}
	unlockTask() {
		this.formioLoader.loading = true;
		this.sub = this.rest.unlockRequest(this.request.id, 'receive a task').subscribe(
			(data) => {
				this.handleunLockTask();
				this.formioLoader.loading = false;
			},
			(error) => {
				if (error.status == 200) {
					this.handleunLockTask();
				} else {
					this.showToast('ErrorOccurred', 'generalError', ErrorToast);
				}
				this.formioLoader.loading = false;
			}
		);
	}
	private handleunLockTask() {
		if (!this.request.requestLocksDTO) this.request.requestLocksDTO = {};
		this.request.requestLocksDTO.process = 'UNLOCKED';
		this.showToast(
			'OperationDone',
			'requestLock.The request has been unlocked successfully',
			SuccessToast
		);
		this.form.ready = false;
		setTimeout(() => (this.form.ready = true));
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
