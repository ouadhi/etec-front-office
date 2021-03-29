import { Injector } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { environment } from 'src/environments/environment';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent extends BaseComponent implements OnInit {

  constructor(public injector: Injector,
    private rest: RequestsService) { super(injector); }

  link: any;
  formData: any;
  submission: any;
  moreInfo: any;
  cmmnId: any;
  requestTask = [];
  data: any;
  formReady = false;
  hasTask = false;
  params;
  request;

  handleAction(event) {
    if (event.type === 'task') {
      this.router.navigate(['/requests/task',
        event.activity.taskId,
        this.request.caseId,
        this.route.snapshot.params.id,
      ]);
    }
  }
  showTask(event) {
    this.hasTask = event;
  }
  ngOnInit() {


    this.sub = this.route.params.subscribe(params => {
      this.sub = this.rest.getRequest(this.route.snapshot.params.id).subscribe(data => {
        this.request = data;
        this.link = this.request.link;
        this.formData = this.request.data;
        this.cmmnId = this.request.cmmnId;
        this.sub = this.rest.getGeneric(`${environment.formio.appUrl}${this.link}/submission/${this.formData}`).subscribe(data => {
          this.submission = data;
          this.moreInfo = (data.data.moreInfo && Object.keys(data.data.moreInfo).length) ? data.data.moreInfo : null;
          this.params = [
            {
              url: environment.beneficiaryApi.api,
              success: `submission.data = {... submission.data, requesterInfo: {data: response}};`,
              parallel: true
            }
          ];
          this.formReady = true;
        })

      });

    });
  }

}
