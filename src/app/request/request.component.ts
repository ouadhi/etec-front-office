import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { environment } from '../../environments/environment';
import { SwitchLangService } from '../switch-lang.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesService,
    private translate: TranslateService,
    public switchLangService: SwitchLangService,
    public toastr: ToastrService
  ) { }

  id: any;
  serviceId: any;
  serviceName: any;
  formReady = false;
  sub: any;

  data: any;
  params;

  ngOnInit() {
    this.toastr.success('', this.translate.instant('SERVICE.SUCCESS'));

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.serviceId = params['serviceId'];
      this.serviceName = params['name'];
      this.params = [
        {
          url: environment.beneficiaryApi.api,
          parallel: true,
          success: `submission.data = {serviceId:"${this.serviceId}",entrepreneurshipType:"${this.serviceId}", requesterInfo: {data: response}};`
        }
      ];
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
    this.toastr.success('', this.translate.instant('SERVICE.SUCCESS'));
    this.goBack();
  }
  /**
   * Go Back After Request is sent
   */
  goBack() {
    this.router.navigate(['/my-requests']);

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
