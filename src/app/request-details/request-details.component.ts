import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { SwitchLangService } from '../switch-lang.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    public switchLangService: SwitchLangService,
  ) { }

  link: any;
  formData: any;
  cmmnId: any;
  sub: any;

  data: any;
  formKey = 'requestahmad';
  formReady = false;
  params;

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
