import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { environment } from 'src/environments/environment';
import { CaseActivityService } from '../../case-activities.service';
import { RequestsService } from '../../requests.service';

@Component({
  selector: 'app-anonymous-request-details',
  templateUrl: './anonymous-request-details.component.html',
  // styleUrls: ['./anonymous-request-details.component.scss']
  encapsulation: ViewEncapsulation.None
})
export class AnonymousRequestDetailsComponent extends BaseComponent implements OnInit {

  constructor(public injector: Injector,
    private rest: RequestsService,
    public caseActivity: CaseActivityService) { super(injector); }

  processInstanceId: string;
  tasks = [];
  link: any;
  formData: any;
  submission: any;
  moreInfo: any;
  cmmnId: any;
  requestTask = [];
  data: any;
  formReady = false;
  hasTask: any;
  params;
  request;

  updateTask = 'SERVICE.beneficiaryTask'
  taskName = '';

  currentRequestTask: any;
  isLoggedIn = false;
  showEditTask = false;

  handleAction(event) {
    if (event.type === 'task') {
      if (this.tasks && this.tasks.length) {
        this.router.navigate(['/requests/task',
          this.tasks[0].task.taskDefinitionKey,
          this.tasks[0].task.id,
          this.request.caseId,
          this.route.snapshot.params.id,
        ]);
      } else {
        this.router.navigate(['/requests/task',
          this.currentRequestTask.taskDefinitionKey,
          event.activity.taskId,
          this.request.caseId,
          this.route.snapshot.params.id,
        ]);
      }
    }
  }
  showTask(event) {
    this.hasTask = event;
    this.sub = this.caseActivity.getRequestTask(this.hasTask.taskId).subscribe(data => {
      this.currentRequestTask = data;
    });
  }
  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    this.sub = this.route.params.subscribe(params => {
      this.sub = this.rest.queryAnonymousRequests(this.route.snapshot.params.id).subscribe(data => {
        this.processInstanceId = data.procInstID;
        this.request = data;
        this.link = this.request.link;
        this.formData = this.request.data;
        this.cmmnId = this.request.cmmnId;

        this.sub = this.rest.getGeneric(`${environment.formio.appUrl}${this.link}/submission/${this.formData}`).subscribe(data => {
          this.submission = data;
          this.showEditTask = this.route.snapshot.params.timestamp == data.data.timestamp && data.data.timestamp;
          this.moreInfo = (data.data.moreInfo && Object.keys(data.data.moreInfo).length) ? data.data.moreInfo : null;

          if (this.processInstanceId && this.showEditTask)
            this.sub = this.rest.getTaskByProcessInstanceId({ processInstanceId: this.processInstanceId }, true)
              .subscribe(data => {
                this.tasks = data;

                if (data.length) {
                  const taskName = `taskTitle.${data[0].task.taskDefinitionKey}`;
                  this.sub = this.translateService.get([taskName, this.updateTask])
                    .subscribe(keys => {
                      if (keys[taskName] != taskName) {
                        this.taskName = `${keys[taskName]}`;
                      } else {
                        this.taskName = keys[this.updateTask];
                      }
                    });
                }
              });

          /*this.params = [
            {
              url: environment.beneficiaryApi.api,
              success: `submission.data = {... submission.data, requesterInfo: {data: response}};`,
              parallel: true
            }
          ];*/
          this.formReady = true;
        })

      });

    });
  }

}
