import { Injector } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { environment } from 'src/environments/environment';
import { CaseActivityService } from '../case-activities.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent extends BaseComponent implements OnInit {

  constructor(public injector: Injector,
    private rest: RequestsService,
    public caseActivity: CaseActivityService) { super(injector); }

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

  currentRequestTask: any;

  handleAction(event) {
    if (event.type === 'task') {
      this.router.navigate(['/requests/task',
        this.currentRequestTask.taskDefinitionKey,
        event.activity.taskId,
        this.request.caseId,
        this.route.snapshot.params.id,
      ]);
    }
  }
  showTask(event) {
    this.hasTask = event;
    this.sub = this.caseActivity.getRequestTask(this.hasTask.taskId).subscribe(data => {
      this.currentRequestTask = data;
    });
  }
  ngOnInit() {


    this.sub = this.route.params.subscribe(params => {
      this.sub = this.rest.getRequest(params.id).subscribe(data => {
        this.request = data;
        this.link = this.request.link;
        this.formData = this.request.data;
        this.cmmnId = this.request.cmmnId;

        this.sub = this.rest.getGeneric(`${environment.formio.appUrl}${this.link}/submission/${this.formData}`).subscribe(data => {
          this.submission = data;
          this.moreInfo = (data.data.moreInfo && Object.keys(data.data.moreInfo).length) ? data.data.moreInfo : null;
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
