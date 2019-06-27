import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesService
  ) { }

  id: any;
  serviceId: any;
  formReady = false;
  sub: any;

  data: any;
  params;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      /*
      5d0429e530313600190003de - 1

5d0429e830313600170001ee - 2


5d0429f130313600120000da - 3
دعم تجهيزات مشروع

5d0429f730313600110000a9 - 4 رسوم خدمات استشاريه


5d0429fb3031360013000249 - 5
د
       */
      switch (params['serviceId']) {
        case '5d0429e530313600190003de':
          this.serviceId = 1;
          break;
        case '5d0429e830313600170001ee':
          this.serviceId = 2;
          break;
        case '5d0429f130313600120000da':
          this.serviceId = 3;
          break;
        case '5d0429f730313600110000a9':
          this.serviceId = 4;
          break;
        case '5d0429fb3031360013000249':
          this.serviceId = 5;
          break;
        default:
          this.serviceId = null;
      }
      this.params = [
        // { url: environment.beneficiaryApi.api, success: `submission.data = {requesterInfo: {data: response}};` }
        {
          url: environment.beneficiaryApi.api,
          success: `submission.data = {entrepreneurshipType:"${this.serviceId}",serviceId:"${this.serviceId}",requesterInfo: {data: response}};`
        }
      ];
      if (!this.serviceId) {
        this.params[0].success = `submission.data = {requesterInfo: {data: response}};`;
      }
      // this.params.success = `submission.data = {serviceId:"${this.serviceId}",requesterInfo: {data: response}};`;
      // @TODO: pass ServiceId
      this.formReady = true;
    });

  }
  onSubmit() {
    this.goBack();
  }
  /**
   * Go Back After Request is sent
   */
  goBack() {
    this.router.navigate(['/']);

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
