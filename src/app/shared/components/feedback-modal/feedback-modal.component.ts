import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/app/modules/services-catalog/services.service';
import { FormioLoader } from 'src/formio/src/lib/features/loader/formio.loader';

@Component({
	selector: 'app-feedback-modal',
	templateUrl: './feedback-modal.component.html',
	styleUrls: ['./feedback-modal.component.scss'],
	providers: [FormioLoader],
})
export class FeedbackModalComponent {
	feedbackForm: FormGroup;

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialogRef: MatDialogRef<FeedbackModalComponent>,
		private formioLoader: FormioLoader,
		private servicesService: ServicesService
	) {
		this.feedbackForm = new FormGroup({
			rate: new FormControl('', [Validators.required]),
			post: new FormControl(''),
			// post: new FormControl('', [
			// 	Validators.required,
			// 	Validators.minLength(10),
			// 	Validators.maxLength(300),
			// ]),
		});
	}

	get feedbackField(): AbstractControl {
		return this.feedbackForm.get('post');
	}

	onConfirmClick(isSubmitClicked: boolean): void {
		// const formData = isSubmitClicked
		// 	? {
		// 			isSubmitClicked,
		// 			value: {
		// 				...this.feedbackForm.value,
		// 			},
		// 	  }
		// 	: {
		// 			isSubmitClicked,
		// 	  };
		debugger;
		if (isSubmitClicked) {
			this.addServiceComments(this.feedbackForm.value);
		} else {
			this.dialogRef.close();
		}
	}

	addServiceComments(formData: any) {
		this.formioLoader.loading = true;

		formData = {
			...formData,
			_usercreator: this.data._usercreator,
			_oid: this.data._oid,
		};
		this.servicesService.postComment(formData).subscribe(
			(res: any) => {
				if (res) {
					debugger;
					this.dialogRef.close(formData);
				}
			},
			(error: any) => {
				this.formioLoader.loading = false;
			}
		);
	}
}
