import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute
  ) { }

  link: any;
  formData: any;
  cmmnId: any;
  sub: any;

  data: any;
  formKey = 'requestahmad';
  formReady = false;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.link = params.link;
      this.formData = params.formData;
      this.cmmnId = params.cmmnId;
      console.log(this.link);
      console.log(this.formData);
      this.formReady = true;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
