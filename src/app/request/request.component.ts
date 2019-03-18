import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private servicesService: ServicesService
  ) { }

  id: any;
  formReady = false;
  sub: any;

  data: any;
  params = { url: null, success: null };

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.params.url = environment.beneficiaryApi.api;
      this.params.success = 'submission.data = {requesterInfo: {data: response}};';
      this.formReady = true;
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
