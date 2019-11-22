import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services.service';
import { environment } from '../../../environments/environment';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-apply-opportunity',
  templateUrl: './apply-opportunity.component.html',
  styleUrls: ['./apply-opportunity.component.css']
})
export class ApplyOpportunityComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesService,
    private accountService: AccountService
    
  ) { }

  id: any;
  formReady = false;
  sub: any;

  data: any;
  submission: any;
  params;
  accountId:string;
  branchId: string;

  ngOnInit() {
    
    this.accountService.getBranchIfForbeneficiary().subscribe(res=>{
      console.log('getBranchIfForbeneficiary res ',res)
      this.branchId = res.branchId
    })

    
    this.accountService.getAccount().subscribe(res=>{
      this.accountId = res.login;
    })

    this.sub = this.route.params.subscribe(params => {
      console.log('apply params url',params)
      this.id = params['id'];
      // TODO: Get Required params to use them in here, assign form key to this.id etc...
     /* this.params = [
        {
          url: environment.beneficiaryApi.api,
          parallel: true,
          success: `submission.data = {...submission.data , requesterInfo: {data: response}};`
          // this is an automated call that will happen in the form,
          // on success it will run the operation specified in here
          // You can use this to assign other required parameters.
          // example:  success: `submission.data =
          // {opportunityName:${params['opportunityName']},requesterInfo: {data: response}};`
        }
      ]; */
      // after your data is ready flip formReady to True.
      this.formReady = true;
    });

  }
  onSubmit(submission) {
    //this.data.data
    console.log('submission',submission);
    
    submission.submission.data['opportunityId'] = this.id;
    submission.submission.data['candidate'] = this.accountId;
    submission.submission.data['branchId'] = this.branchId;

    this.servicesService.applyOpportunity(submission.submission.data).subscribe(
      (data) => {
        console.log('data_cms',data)

        setTimeout(()=>{
          this.goBack(data._id);
        },2000)
        
      })

    
    
  }
  /**
   * Go Back After Request is sent
   */
  goBack(newOppId) {
    this.router.navigate(['/opportunity/applied/'+newOppId]);

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
