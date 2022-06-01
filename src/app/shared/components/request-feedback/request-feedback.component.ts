import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RequestsService } from 'src/app/modules/requests/requests.service';
import { ErrorToast, FormioLoader, SuccessToast } from 'src/formio/src/public_api';

@Component({
	selector: 'app-request-feedback',
	templateUrl: './request-feedback.component.html',
	styleUrls: ['./request-feedback.component.scss'],
})
export class RequestFeedbackComponent implements OnInit, OnDestroy {
	data: any;
	requestId: string;
	feedbackId: string;
	feedbackFormKey: string;
	formReady = false;
	feedbackSubmission = { data: {} };
	requestDetailsSubmission: any = { data: {} };

	private subs: Subscription[] = [];
	set sub(s: Subscription) {
		this.subs.push(s);
	}

	constructor(
		private translateService: TranslateService,
		private requestsService: RequestsService,
		private route: ActivatedRoute,
		private router: Router,
		private formioLoader: FormioLoader,
		private toastrService: ToastrService
	) {}

	ngOnInit() {
		this.formioLoader.loading = true;
		this.sub = this.route.params.subscribe((params) => {
			this.feedbackId = params['feedbackId'];
			this.requestId = params['requestId'];

			this.getRequestAndFeedbackDetails();
		});
	}

	getRequestAndFeedbackDetails() {
		this.sub = this.requestsService
			.getRequest(this.requestId)
			.pipe(
				switchMap((res: any) => {
					this.requestDetailsSubmission.data = {
						...res,
						requestDate: res.requestDate.substr(0, res.requestDate.length - 5),
					};

					return this.requestsService.checkRequestFeedback(
						this.requestDetailsSubmission.data.serviceId,
						this.requestId
					);
				})
			)
			.subscribe((res: any[]) => {
				if (res && res[0] != null) {
					if (
						this.requestDetailsSubmission.data.serviceId === res[0].serviceKey &&
						this.requestDetailsSubmission.data.id === res[0].requestId
					) {
						this.feedbackSubmission.data = {
							feedbackId: this.feedbackId,
							requestId: this.requestId,
							serviceId: this.requestDetailsSubmission.data.serviceId,
							ratingScale: res[0].ratingScale,
						};
						this.feedbackFormKey = res[0].formKey;
						this.formReady = true;
					} else {
						this.goToRequestDetails(false);
					}
				} else {
					this.goToRequestDetails(false);
				}
			});
	}

	afterFeedbackSubmitted(event) {
		if (event && event.submission && event.submission.data) {
			this.showToast(
				this.translateService.instant('Done'),
				this.translateService.instant('Feedback is sent successfully'),
				false
			);

			setTimeout(() => {
				this.goToRequestDetails(true);
			}, 3000);
		}
	}

	private showToast(title: string, message: string, isError: boolean) {
		this.toastrService.show(message, title, {
			toastClass: 'notification-toast',
			closeButton: true,
			enableHtml: true,
			toastComponent: isError ? ErrorToast : SuccessToast,
		});
	}

	goToRequestDetails(afterSubmit: boolean) {
		afterSubmit ? window.close() : this.router.navigate([`/requests/details/${this.requestId}`]);
	}

	ngOnDestroy() {
		this.subs.forEach((s) => s.unsubscribe());
		this.subs = [];
	}
}
