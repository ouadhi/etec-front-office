import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseComponent } from '../../../shared/components/base.component';
import { InOutAnimation } from 'src/app/core/animations/in-out.animation';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  // styleUrls: ['./request.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [InOutAnimation]
})
export class RequestComponent extends BaseComponent implements OnInit {

  constructor(public injector: Injector) {
    super(injector);
  }

  id: any;
  serviceId: any;
  navParams: any;
  formReady = false;

  data: any;
  params;
  isLoggedIn = false;
  submission = { data: {} };

  hasResult = false;
  requestNumber: string;
  requestDate: Date;

  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.serviceId = params['serviceId'];
      this.navParams = params;
      /*if (this.isLoggedIn) {
        this.params = [
          {
            url: environment.beneficiaryApi.api,
            parallel: true,
            success: `submission.data = {serviceId:"${this.serviceId}",
            entrepreneurshipType:"${this.serviceId}", requesterInfo: {data: response}};`
          }
        ];
      } else {*/
      this.submission.data = { serviceId: this.serviceId };
      // }

      if (
        !this.serviceId || this.serviceId === null ||
        this.serviceId === undefined || this.serviceId === '' ||
        this.serviceId === 'undefined') {
        this.params[0].success = `submission.data = {requesterInfo: {data: response}};`;
      }
      this.formReady = true;
    });
  }
  onSubmit(event) {
    // this.toastr.success('', this.translate.instant('SERVICE.SUCCESS'));
    let requestId;
    let requestDate;
    Object.keys(event.submission.metadata).forEach((key) => {
      if (event.submission.metadata[key].hasOwnProperty('requestId')) {
        requestId = event.submission.metadata[key].requestNumber;
        requestDate = event.submission.metadata[key].requestDate;
        return false;
      }
    });

    this.requestNumber = requestId;
    this.requestDate = requestDate;
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
