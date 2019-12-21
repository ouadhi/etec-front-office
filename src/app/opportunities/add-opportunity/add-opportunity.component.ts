import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services.service';
import { environment } from '../../../environments/environment';
import { SessionService } from '../../session.service';
import { encodeUriFragment } from '@angular/router/src/url_tree';
import { AccountService } from 'src/app/account.service';

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
    private sessionService: SessionService,
    private accountService: AccountService
  ) { }

  id: any;
  serviceId: any;
  formReady = false;
  sub: any;

  data: any;
  params;
  branchId: string;
  submission;

  async ngOnInit() {


    
    const userInfo: any = await this.sessionService.loadUserProfile();
    this.accountService.getBranchId(userInfo.email).subscribe(res=>{
      this.branchId = res.branchId;
      console.log('userInfo', userInfo)
      console.log('getbrachid', res)
    })

    if(userInfo.authorities.indexOf(environment.roles.ROLE_DEPARTMENT_ENABLEMENT_SPECIALIST) > -1){
      this.submission={
        data:{
          'enableBranch' : true
        }
      }
    }

    if(userInfo.authorities.indexOf(environment.roles.department_specialist) > -1){
      this.submission={
        data:{
          'enableBranch' : false
        }
      }
    }
    
    this.sub = this.route.params.subscribe(params => {
      // TODO: Get Required params to use them in here, assign form key to this.id etc...
      // this.params = [
      //   {
      //     url: `${environment.wso2.base}${environment.wso2.api.erp}employee/${encodeURIComponent(userInfo.login)}`,
      //     parallel: true,
      //     success: `submission.data =  { ... submission.data, branchId: response.role_branchId };`
      //   }
      // ];
      // after your data is ready flip formReady to True.
      this.formReady = true;
    });
  }
  onSubmit(submission) {
    //this.data.data
    
    submission.submission.data['branchId'] = this.branchId;
    
    console.log('submission',submission);
    this.servicesService.postOpportunity(submission.submission.data).subscribe(
      (data) => {
        console.log('data_cms',data)
      })
    
      setTimeout(()=>{
        this.goBack();
      },2000
    )
  }
  /**
   * Go Back After Request is sent
   */
  goBack() {
    this.router.navigate(['/opportunity/all']);

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
