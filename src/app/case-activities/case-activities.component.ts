import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CaseActivityService } from './case-activities.service';

@Component({
    selector: 'app-case-activities',
    templateUrl: 'case-activities.component.html',
    styleUrls: ['case-activities.component.scss'],
    providers: [CaseActivityService]
})

export class CaseActivitiesComponent implements OnInit {
    @Input() caseInstanceId;
    @Output() activityAction = new EventEmitter();
    activities = [];
    constructor(
        private caseActivityService: CaseActivityService,
        public translate: TranslateService
    ) { }

    action(activity) {
        console.log(activity);
        this.activityAction.emit({
            type: 'task', activity
            /*
            formKey: this.tasks[this.tasks.length - 1].formKey,
            caseDefinitionId: this.tasks[this.tasks.length - 1].caseDefinitionId,
            caseInstanceId: this.tasks[this.tasks.length - 1].caseInstanceId,
            taskDefinitionKey: this.tasks[this.tasks.length - 1].taskDefinitionKey,
            taskId: this.tasks[this.tasks.length - 1].taskId
            */
        });
    }
    ngOnInit(): void {
        this.caseActivityService.getCaseHistoryActivities({ caseInstanceId: this.caseInstanceId })
            .subscribe(data => {
                const extraItem = {
                    id: 'b5cac54f-e21b-11e9-a50b-8c16456e9d50',
                    caseInstanceId: 'b5c34b30-e21b-11e9-a50b-8c16456e9d50',
                    caseDefinitionId: 'ServiceCmmnTask:1:ef4a7cdd-e120-11e9-94d2-8c16456e9d50',
                    activityId: 'TaskID',
                    activityName: 'task',
                    activityType: 'humanTask',
                    activityDescription: null,
                    parentId: 'b5c34b30-e21b-11e9-a50b-8c16456e9d50',
                    tenantId: null,
                    required: false,
                    enabled: false,
                    active: true,
                    disabled: false
                };
                this.activities = data;
                this.activities.push(extraItem);
            });
    }
}
