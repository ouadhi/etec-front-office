import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { RequestsService } from '../requests.service';
import { debounceTime } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { FilterService } from '../filter.service';
import { InOutAnimation } from 'src/app/core/animations/in-out.animation';

@Component({
  selector: 'app-request-query',
  templateUrl: './request-query.component.html',
  // styleUrls: ['./request-query.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [InOutAnimation]
})
export class RequestQueryComponent extends BaseComponent implements OnInit, OnDestroy {
  query: FormGroup = new FormGroup({
    requestNumber: new FormControl(null, [Validators.required]),
    requestDate: new FormControl(null, [Validators.required]),
    requestType: new FormControl(null, [Validators.required]),
  });
  notFound = false;
  found = false;
  services = [];

  requestName = '';
  cmmnId: string;
  requestId: number;
  queryData: any = {};
  activeTask = false;

  data: any;
  tasks: any[];
  isLoggedIn = false;

  get requestDetailsUrl() {
    return `/requests/details/${this.requestId}/anonymous`;
  }

  constructor(public injector: Injector,
    private rest: RequestsService,
    private filterService: FilterService,
    private reCaptchaV3Service: ReCaptchaV3Service) { super(injector); }

  doQuery() {
    if (this.query.valid) {
      this.queryData = {};
      this.cmmnId = '';
      this.notFound = false;
      this.found = false;
      // this.reCaptchaV3Service.execute('6LejM-UUAAAAAB78NI-6A5O0qmtJWAHm0iF8qnB4', 'queryRequest', (token) => {
      //   if (token) {
      //     this.sub = this.rest.verifyToken(token).subscribe(data => {
      //       if (data.success) {
      if (this.query.controls.requestDate.value) {
        const tomorrow = new Date();
        tomorrow.setDate(this.query.controls.requestDate.value.getDate() + 1);
        this.queryData['requestDate.greaterOrEqualThan'] =
          `${this.datePipe.transform(this.query.controls.requestDate.value, 'yyyy-MM-ddT00:00:00')}` + "Z";
        this.queryData['requestDate.lessThan'] = `${this.datePipe.transform(tomorrow, 'yyyy-MM-ddT00:00:00')}` + "Z";
      } else if (this.query.controls.requestType.value) {
        this.queryData['serviceId.equals'] = this.query.controls.requestType.value;
      }
      this.queryData['number.equals'] = this.query.controls.requestNumber.value;

      this.replaceUrl(this.toQueryString(this.queryData));

      this.sub = this.rest.queryRequests({
        ...this.queryData

      }).subscribe((data) => {
        if (data.length) {
          this.notFound = false;
          this.found = true;
          // this.router.navigate(['requests/details', data[0].id], { relativeTo: this.route });

          this.data = data[0];
          this.requestName = data[0].requestName;
          this.cmmnId = data[0].cmmnId;
          this.requestId = data[0].id;
          this.activeTask = data[0].activeTask;

          this.sub = this.rest.getTaskByProcessInstanceId({ processInstanceId: this.data.procInstID })
            .subscribe(data => {
              this.tasks = data;
            });
        } else {
          this.notFound = true;
          this.found = false;
        }


      }, () => {
        this.notFound = true;
        this.found = false;
      });
      //   }
      // });
      //   }
      // }, {
      //   useGlobalDomain: false
      // });

    }
  }
  getServices(){
    this.filterService.getPublishedServices().subscribe(data => this.services = data);
  }
  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    this.getServices();
    this.translateService.onLangChange.subscribe((res)=>{
      this.getServices();
    });
    this.sub = this.query.controls.requestType.statusChanges.pipe(debounceTime(200)).subscribe(() => {
      this.loggerService.log(this.query.controls.requestType.valid);

      if (!this.query.controls.requestType.valid) {
        this.query.controls.requestDate.setValidators([Validators.required]);
      } else {
        this.query.controls.requestDate.clearValidators();
      }
      this.query.controls.requestDate.updateValueAndValidity({ emitEvent: false });
      this.query.controls.requestType.updateValueAndValidity({ emitEvent: false });
    });
    this.sub = this.query.controls.requestDate.statusChanges.pipe(debounceTime(200)).subscribe(() => {
      this.loggerService.log(this.query.controls.requestDate.valid);
      if (!this.query.controls.requestDate.valid) {
        this.query.controls.requestType.setValidators([Validators.required]);
      } else {
        this.query.controls.requestType.clearValidators();
      }
      this.query.controls.requestDate.updateValueAndValidity({ emitEvent: false });
      this.query.controls.requestType.updateValueAndValidity({ emitEvent: false });
    });

    this.queryData = { ...this.queryData, ...this.fromQueryString() };
    if (this.queryData['requestDate.greaterOrEqualThan'])
      this.query.controls.requestDate.setValue(new Date(this.queryData['requestDate.greaterOrEqualThan']));
    if (this.queryData['serviceId.equals'])
      this.query.controls.requestType.setValue(this.queryData['serviceId.equals']);
    if (this.queryData['number.equals'])
      this.query.controls.requestNumber.setValue(this.queryData['number.equals']);
    this.query.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    setTimeout(() => this.doQuery(), 250);
  }


  ngOnDestroy() {
  }

  handleAction() {
    this.router.navigate(['/requests/task',
      this.tasks[0].taskDefinitionKey,
      this.tasks[0].id,
      this.data.caseId,
      this.data.id,
    ]);
  }

  get serviceName() {
    if (!this.cmmnId) return "";
    const service = this.services.find(q => q.id == this.query.controls.requestType.value);
    return service ? service.name : '';
  }

}
