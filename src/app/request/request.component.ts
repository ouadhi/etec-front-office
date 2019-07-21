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
      this.serviceId = params['serviceId'];
      console.log(this.route.snapshot);
      this.params = [
        // { url: environment.beneficiaryApi.api, success: `submission.data = {requesterInfo: {data: response}};` }
        {
          url: environment.beneficiaryApi.api,
          success: `submission.data = {serviceId:"${this.serviceId}",requesterInfo: {data: response}};`
        }
      ];
      if (!this.serviceId || this.serviceId === null || this.serviceId === undefined || this.serviceId === '') {
        this.params[0].success = `submission.data = {requesterInfo: {data: response}};`;
      }
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
