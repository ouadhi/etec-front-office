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
    private rest: RequestsService,
    public switchLangService: SwitchLangService
  ) { }

  link: any;
  formData: any;
  submission: any;
  cmmnId: any;
  sub: any;
  requestTask = [];
  data: any;
  formReady = false;
  hasTask = false;
  params;
  request;

  handleAction(event) {
    if (event.type === 'task') {
      this.router.navigate(['/request-task',
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
      this.rest.getRequest(this.route.snapshot.params.id).subscribe(data => {
        this.request = data;
        this.link = this.request.link;
        this.formData = this.request.data;
        this.cmmnId = this.request.cmmnId;
        this.rest.getGeneric(`${environment.formio.appUrl}${this.link}/submission/${this.formData}`).subscribe(data => {
          this.submission = data;
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
