import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services.service';
import { environment } from '../../../environments/environment';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-applied-opportunity',
  templateUrl: './applied-opportunity.component.html',
  styleUrls: ['./applied-opportunity.component.css']
})
export class AppliedOpportunityComponent implements OnInit, OnDestroy {

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
  oppData:any;
  submission: any;
  params;

  ngOnInit() {
  
    this.sub = this.route.params.subscribe(params => {
      console.log('applied params url',params)
      this.id = params['id'];

      this.servicesService.appliedOpportunity(this.id).subscribe(
        (data) => {
          console.log('view applied'+this.id, data.entries[0])
          
          
          this.data = data.entries[0];
          this.formReady = true;

          
          // get opp data
          this.servicesService.getOpportunity(this.data.opportunityId).toPromise().then((opp)=>{
            this.oppData = opp['entries'][0];

            let cvAsArray = [];
            cvAsArray[0]= this.data.cv;

            this.data = {
              data : {
                "currentlyWorking": this.data.isCurrentlyEmployed,
                //"currentEmployer": ,
                //"sectorType": ,
                //"currentTitle": ,
                "specialization": this.data.educationAndMajor,
                "educationalOrganization": this.data.educationPlace,
                "graduationYear": this.data.graduationYear,
                "gpa": this.data.graduationScore,
                "experienceYearsPosition": this.data.yearOfExperienceSameTitle,
                "otherExperienceYears": this.data.yearOfExperienceOtherTitles,
                "englishLevel": this.data.englishLevel,
                "computerSkillsLevel": this.data.computerSkillsLevel,
                "cv": cvAsArray,
                "linkedInProfile": this.data.linkedinProfile ,
                
                "branchId": this.data.branchId,
                "candidate": this.data.candidate,
                "opportunityId": this.data.opportunityId,
                "panelColumnsId": this.oppData.number,
                "panelColumnsJobTitle": this.oppData.name
  
              }
            }


          })


          
          
        })
        
    });

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
