import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-view-opportunity',
  templateUrl: './view-opportunity.component.html',
  styleUrls: ['./view-opportunity.component.css']
})
export class ViewOpportunityComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService
  ) { }

  id: any;
  sub: any;
  data: any;
  submission: any;
  formReady: boolean = false;
  paramsForm: any;
  applyRoute: any;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.applyRoute = '/opportunity/apply/' + this.id;
      this.load(this.id);
    });
  }

  load(id) {
    this.servicesService.getOpportunity(id).subscribe(
      (data) => {
        this.data = data.entries[0];
        this.formReady = true;

        this.data = {
          data : {
            "jobTitle": this.data.name,
            "id": this.data.number,
            "city": this.data.city,
            "organization": this.data.employer,
            "description": this.data.description,
            "salaryNegotiation": this.data.salaryType,
            "opportunityDetailsPanelColumnsExpectedSalaryinSar": this.data.salaryAmount,
            "applicationStartDate": this.data.from,
            "applicationEndDate": this.data.to,
            "educationLevel": this.data.education,
            "opportunityDetailsPanelColumnsPositionsCounts": this.data.vacancies,
            "requirements": this.data.requirements,
            "qualifications": this.data.qualifications,
            "certificates": this.data.certificates,
            "requiredExperienceYears": this.data.yearsOfExperience,
            "notes": this.data.notes,
            "branchId":"_STATIC_EXAMPLE_"
          }
        }

      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
