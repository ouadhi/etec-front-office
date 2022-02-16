
import { KeycloakService } from 'keycloak-angular';
import { UserService } from 'src/formio/src/public_api';

import { Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { environment } from 'src/environments/environment';
import { FormioComponent, SuccessToast } from 'src/formio/src/public_api';
import { CaseActivityService } from '../case-activities.service';
declare var $: any;
/**
 * Main Task Component
 */
@Component({
	selector: 'app-request-task',
	templateUrl: './request-task.component.html',
	// styleUrls: ['./request-task.component.scss'],
	encapsulation: ViewEncapsulation.None,
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
	/*
  submitPromise: Promise<any>;
  submitPromiseResolve: any;
*/

	constructor(
		public injector: Injector,
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
		this.goBack();
	}

	customSubmit(submission) {
		const send = Object.assign({}, this.formComponent.submission);
		send.data.saveAndSend = true;
		this.formComponent.submitForm(send);
	}

	formLoad(formSettings) {
		setTimeout(() => {
			if (formSettings.properties && eval(formSettings.properties.hideSubmit)) {
				document.getElementsByName('data[submit]')[0].style.display = 'none';
				document.getElementById('custom-actions').style.display = 'block';
			}

			$('.input-group:has(.input-group-addon.input-group-prepend)').css('display', 'block');
		});
	}

	/**
	 * ngOnInit: on init subscribe to route changes
	 */
	ngOnInit() {
		this.sub = this.route.params.subscribe((params) => {
			this.sub = this.caseActivity.getRequestTask(params.taskId).subscribe(async (data) => {
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

					const isLoggedIn = await this.keycloakService.isLoggedIn();
					const etecData = await this.userService.getTaskUserData(isLoggedIn ? await this.keycloak.getToken() : null);
					this.submission.data = { ...etecData };
					this.params = [
						{
							url: `${environment.gateway}${environment.endpoints.humanTask}${data.formKey.replace(
								'{caseId}',
								params.caseId
							)}`,
							parallel: false,
							success: `submission.data = {...response.data,...submission.data, taskId:"${params.taskId}", requestId:"${params.requestId}"};`,
						},
					];
					this.form.formKey = data.formKey.split('/')[2];

					setTimeout(() => {
						this.form.ready = true;
					}, 0);
				}
			});
		});
	}
}
