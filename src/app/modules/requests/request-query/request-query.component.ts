import { Injector } from '@angular/core';
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
  styleUrls: ['./request-query.component.scss'],
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

  cmmnId: string;
  requestId: number;
  get requestDetailsUrl() {
    return `/requests/details/${this.requestId}`;
  }

  constructor(public injector: Injector,
    private rest: RequestsService,
    private filterService: FilterService,
    private reCaptchaV3Service: ReCaptchaV3Service) { super(injector); }

  doQuery() {
    if (this.query.valid) {
      this.cmmnId = '';
      this.notFound = false;
      this.found = false;
      // this.reCaptchaV3Service.execute('6LejM-UUAAAAAB78NI-6A5O0qmtJWAHm0iF8qnB4', 'queryRequest', (token) => {
      //   if (token) {
      //     this.sub = this.rest.verifyToken(token).subscribe(data => {
      //       if (data.success) {
      const query = {};
      if (this.query.controls.requestDate.value) {
        const tomorrow = new Date();
        tomorrow.setDate(this.query.controls.requestDate.value.getDate() + 1);
        query['requestDate.greaterOrEqualThan'] =
          `${this.datePipe.transform(this.query.controls.requestDate.value, 'yyyy-MM-ddT00:00:00')}` + "Z";
        query['requestDate.lessThan'] = `${this.datePipe.transform(tomorrow, 'yyyy-MM-ddT00:00:00')}` + "Z";
      } else if (this.query.controls.requestType.value) {
        query['serviceId.equals'] = this.query.controls.requestType.value;
      }
      this.sub = this.rest.queryRequests({
        ...query,
        'number.equals': this.query.controls.requestNumber.value

      }).subscribe((data) => {
        if (data.length) {
          this.notFound = false;
          this.found = true;
          // this.router.navigate(['requests/details', data[0].id], { relativeTo: this.route });

          this.cmmnId = data[0].cmmnId;
          this.requestId = data[0].id;

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
  ngOnInit(): void {
    this.sub = this.filterService.getServices().subscribe(data => this.services = data);
    this.sub = this.query.controls.requestType.statusChanges.pipe(debounceTime(200)).subscribe(() => {
      this.loggerService.log(this.query.controls.requestType.valid);

      if (!this.query.controls.requestType.valid) {
        this.query.controls['requestDate'].setValidators([Validators.required]);
      } else {
        this.query.controls['requestDate'].clearValidators();
      }
      this.query.controls['requestDate'].updateValueAndValidity({ emitEvent: false });
      this.query.controls['requestType'].updateValueAndValidity({ emitEvent: false });
    });
    this.sub = this.query.controls.requestDate.statusChanges.pipe(debounceTime(200)).subscribe(() => {
      this.loggerService.log(this.query.controls.requestDate.valid);
      if (!this.query.controls.requestDate.valid) {
        this.query.controls['requestType'].setValidators([Validators.required]);
      } else {
        this.query.controls['requestType'].clearValidators();
      }
      this.query.controls['requestDate'].updateValueAndValidity({ emitEvent: false });
      this.query.controls['requestType'].updateValueAndValidity({ emitEvent: false });
    });

  }


  ngOnDestroy() {
  }

  get serviceName() {
    if (!this.cmmnId) return "";
    const service = this.services.find(q=> q.id == this.query.controls.requestType.value);
    return service.name;
  }

}
