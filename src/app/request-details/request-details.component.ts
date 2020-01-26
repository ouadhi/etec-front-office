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
  hasTask = false;
  params;

  handleAction(event) {
    if (event.type === 'task') {
      console.log(event);
      this.caseActivity.getRequestTasks({ caseInstanceId: this.cmmnId }).subscribe((data) => {
        this.requestTask = data;
        this.router.navigate(['/request-task',
          `${this.link}-task`,
          this.requestTask[this.requestTask.length - 1].caseDefinitionId.split(':')[0],
          this.requestTask[this.requestTask.length - 1].caseInstanceId,
          this.requestTask[this.requestTask.length - 1].taskDefinitionKey,
          this.requestTask[this.requestTask.length - 1].id,
          this.route.snapshot.params.caseId,
          this.route.snapshot.params.id,
        ]);

      });
    }
  }
  showTask() {
    this.hasTask = true;
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
