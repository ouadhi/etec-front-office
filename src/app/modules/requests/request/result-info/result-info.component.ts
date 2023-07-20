import { Component, Injector, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { FeedbackModalComponent } from 'src/app/shared/components/feedback-modal/feedback-modal.component';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-result-info',
	templateUrl: './result-info.component.html',
	// styleUrls: ['./result-info.component.scss']
	encapsulation: ViewEncapsulation.None,
})
export class ResultInfoComponent extends BaseComponent {
	@Input() icon: string;
	@Input() actionLabel: string;
	@Input() serviceId: string;
	@Input() userCreator: string;
	@Output() callback = new EventEmitter();

	showFeedbackButton: boolean;

	constructor(public injector: Injector, public dialog: MatDialog) {
		super(injector);
		this.showFeedbackButton = environment.showFeedbackButton;
	}

	openFeedbackDialog() {
		this.dialog.open(FeedbackModalComponent, {
			panelClass: 'panelClass',
			width: '500px',
			data: {
				_usercreator: this.userCreator,
				_oid: this.serviceId,
			},
		});
	}
}
