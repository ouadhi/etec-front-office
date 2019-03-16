import { Component, Input, OnInit } from '@angular/core';
import { CaseActivityService } from './case-activities.service';

@Component({
    selector: 'app-case-activities',
    templateUrl: 'case-activities.component.html',
    styleUrls: ['case-activities.component.scss'],
    providers: [CaseActivityService]
})

export class CaseActivitiesComponent implements OnInit {
    @Input() caseInstanceId;
    activities = [];
    constructor(private caseActivityService: CaseActivityService) { }
    ngOnInit(): void {
        this.caseActivityService.getCaseHistoryActivities({ caseInstanceId: this.caseInstanceId })
            .subscribe(data => {
                this.activities = data;
            });
    }
}
