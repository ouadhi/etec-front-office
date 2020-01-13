import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { RequestsService } from '../requests.service';
import { CaseActivityService } from '../case-activities/case-activities.service';
import { SwitchLangService } from '../switch-lang.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caseActivity: CaseActivityService,
    public switchLangService: SwitchLangService
  ) { }

  link: any;
  formData: any;
  cmmnId: any;
  sub: any;
  requestTask = [];
  data: any;
  formReady = false;
  params;

  handleAction(event) {
    if (event.type === 'task') {
      console.log(event);
      this.caseActivity.getRequestTasks({ caseInstanceId: this.cmmnId }).subscribe((data) => {
        this.requestTask = data;
        this.requestTask = [
          {
            id: '0baa69da-e21c-11e9-a50b-8c16456e9d50',
            name: 'task',
            assignee: null,
            created: '2019-09-28T21:16:09.000+0300',
            due: null,
            followUp: null,
            delegationState: null,
            description: null,
            executionId: null,
            owner: null,
            parentTaskId: null,
            priority: 50,
            processDefinitionId: null,
            processInstanceId: null,
            taskDefinitionKey: 'TaskID',
            caseExecutionId: 'b5cac54f-e21b-11e9-a50b-8c16456e9d50',
            caseInstanceId: 'b5c34b30-e21b-11e9-a50b-8c16456e9d50',
            caseDefinitionId: 'ServiceCmmnTask:1:ef4a7cdd-e120-11e9-94d2-8c16456e9d50',
            suspended: false,
            formKey: 'TaskKey',
            tenantId: null
          }
        ];
        this.router.navigate(['/request-task',
          this.requestTask[this.requestTask.length - 1].formKey,
          this.requestTask[this.requestTask.length - 1].caseDefinitionId,
          this.requestTask[this.requestTask.length - 1].caseInstanceId,
          this.requestTask[this.requestTask.length - 1].taskDefinitionKey,
          this.requestTask[this.requestTask.length - 1].id,
          this.route.snapshot.params.caseId,
          this.route.snapshot.params.requestId,
        ]);

      });
    }
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.link = params.link;
      this.formData = params.formData;
      this.cmmnId = params.cmmnId;
      this.params = [
        {
          url: environment.beneficiaryApi.api,
          success: `submission.data = {... submission.data, requesterInfo: {data: response}};`,
          parallel: true
        }
      ];
      this.formReady = true;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
