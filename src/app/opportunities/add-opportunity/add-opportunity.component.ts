import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services.service';
import { environment } from '../../../environments/environment';
import { SessionService } from '../../session.service';

@Component({
  selector: 'app-add-opportunity',
  templateUrl: './add-opportunity.component.html',
  styleUrls: ['./add-opportunity.component.css']
})
export class AddOpportunityComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesService,
    private sessionService: SessionService
  ) { }

  id: any;
  serviceId: any;
  formReady = false;
  sub: any;

  data: any;
  params;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      // TODO: Get Required params to use them in here, assign form key to this.id etc...
      this.params = [
        {
          url: `${environment.wso2.base}${environment.wso2.api.erp}employees/322`,
          parallel: true,
          success: `submission.data = {requesterInfo: {data: response}};`
          // this is an automated call that will happen in the form,
          // on success it will run the operation specified in here
          // You can use this to assign other required parameters.
          // example:  success: `submission.data =
          // {opportunityName:${params['opportunityName']},requesterInfo: {data: response}};`
        }
      ];
      // after your data is ready flip formReady to True.
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
