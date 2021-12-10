import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseComponent } from '../../../shared/components/base.component';
import { InOutAnimation } from 'src/app/core/animations/in-out.animation';
import { ETECService } from 'src/app/core/services/etec.service';
import { RequestsService } from '../requests.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  // styleUrls: ['./request.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [InOutAnimation]
})
export class RequestComponent extends BaseComponent implements OnInit {

  constructor(public injector: Injector,
    private etecService: ETECService,
    private rest: RequestsService) {
    super(injector);
  }

  id: any;
  serviceId: any;
  caseId: any;
  navParams: any = {};
  formReady = false;
  request: any;

  data: any;
  params;
  isLoggedIn = false;
  submission = { data: {} };

  hasResult = false;
  requestNumber: string;
  requestDate: Date;
  isDraft: false;

  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    this.sub = this.translateService.onLangChange.subscribe(() => this.getData());
    this.sub = this.route.params.subscribe(async params => {
      this.id = params['id'];
      this.serviceId = params['serviceId'];
      this.caseId = params['caseId'];
      this.navParams = params;
      const etecData = await this.etecService.getEtecData();
      this.submission.data = { serviceId: this.serviceId, ...etecData };

      if (
        !this.serviceId || this.serviceId === null ||
        this.serviceId === undefined || this.serviceId === '' ||
        this.serviceId === 'undefined') {
        this.params[0].success = `submission.data = {requesterInfo: {data: response}};`;
      }

      if (this.caseId) this.getData();
      else this.formReady = true;
    });
  }

  getData() {
    this.sub = this.rest.getRequest(this.caseId).subscribe(data => {
      this.request = data;
      const link = this.request.link;
      const formData = this.request.data;

      this.sub = this.rest.getGeneric(`${environment.formio.appUrl}${link}/submission/${formData}`).subscribe(data => {
        this.submission.data = {
          ...this.submission.data,
          ...data.data,
          requestId: this.request.id,
          _id: formData
        };
        this.formReady = true;
      })

    });
  }
  onSubmit(event) {
    // this.toastr.success('', this.translate.instant('SERVICE.SUCCESS'));
    let requestId;
    let requestDate;
    let isDraft;
    Object.keys(event.submission.metadata).forEach((key) => {
      if (event.submission.metadata[key].hasOwnProperty('requestId')) {
        requestId = event.submission.metadata[key].requestNumber;
        requestDate = event.submission.metadata[key].requestDate;
        isDraft = event.submission.metadata[key].state == 'draft';
        return false;
      }
    });

    this.requestNumber = requestId;
    this.requestDate = requestDate;
    this.isDraft = isDraft;
    this.hasResult = true;
  }
  /**
   * Go Back After Request is sent
   */
  goBack() {
    if (this.isLoggedIn) {
      this.router.navigate(['/requests/my']);

    } else {
      this.router.navigate(['/']);

    }

  }

}
