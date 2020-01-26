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
    @Output() task = new EventEmitter();
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

                this.activities = data;
                this.activities.filter(activity => {
                    if (activity.caseActivityName === 'task' && activity.active && !activity.completed) {
                        this.task.emit(activity);
                    }
                });
            });
    }
}
