import { Component, Inject } from '@angular/core';
import { ContactCandidatesService } from '../contact-candidates.services';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'request-info',
    templateUrl: 'request-info.dialog.html',
    styleUrls: ['./request-info.dialog.scss']
})
export class RequestInfoDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<RequestInfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    message: string;
    onNoClick(): void {
        this.dialogRef.close();
    }
    printHtml(html: HTMLInputElement) {
        window.print();
    }
}
