import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { RequestsService } from '../requests.service';
import { CaseActivityService } from '../case-activities/case-activities.service';
import { SwitchLangService } from '../switch-lang.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-request-query',
  templateUrl: './request-query.component.html',
  styleUrls: ['./request-query.component.css']
})
export class RequestQueryComponent implements OnInit, OnDestroy {
  query = {
    requestDate: null,
    requestNumber: ''
  };
  notFound = false;
  found = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caseActivity: CaseActivityService,
    private rest: RequestsService,
    public switchLangService: SwitchLangService,
    public datePipe: DatePipe
  ) { }
  doQuery() {
    if (this.query.requestNumber && this.query.requestDate) {

      const tomorrow = new Date();
      tomorrow.setDate(this.query.requestDate.getDate() + 1);

      this.rest.queryRequests({
        'requestDate.greaterOrEqualThan': `${this.datePipe.transform(this.query.requestDate, 'yyyy-MM-ddT00:00:00')}` + "Z",
        'requestDate.lessThan': `${this.datePipe.transform(tomorrow, 'yyyy-MM-ddT00:00:00')}` + "Z",
        'number.equals': this.query.requestNumber

      }).subscribe((data) => {
        if (data.length) {
          this.notFound = false;
          this.found = true;
          this.router.navigate(['request-details', data[0].id], { relativeTo: this.route });

        } else {
          this.notFound = true;
          this.found = false;
        }


      }, () => {
        this.notFound = true;
        this.found = false;
      });
    }
  }
  ngOnInit(): void {
  }


  ngOnDestroy() {
  }

}
