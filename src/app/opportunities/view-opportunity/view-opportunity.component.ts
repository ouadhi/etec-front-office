import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services.service';
import { environment } from 'src/environments/environment.prod';
import { SessionService } from 'src/app/session.service';
import { AccountService } from 'src/app/account.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactCandidatesService } from 'src/app/contact-candidates.services';
import { SwitchLangService } from '../../switch-lang.service';


@Component({
  selector: 'app-view-opportunity',
  templateUrl: './view-opportunity.component.html',
  styleUrls: ['./view-opportunity.component.scss']
})
export class ViewOpportunityComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private sessionService: SessionService,
    private accountService: AccountService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private contactCandidatesService: ContactCandidatesService,
    public switchLangService: SwitchLangService,
  ) { }

  oppId: any;
  sub: any;
  res: any;
  data: any;
  submission: any;
  formReady: boolean = false;
  paramsForm: any;
  applyRoute: any;

  applicants;
  isAlreadyApplied: boolean = false;
  isWithinDate: boolean = false;
  userId: string;
  displayedColumns;

  checkboxCandidates = {};
  isAllCandidates = false;
  selectedCandidates = [];

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.oppId = params['id'];
      this.applyRoute = '/opportunity/apply/' + this.oppId;
      this.load(this.oppId);
      //if (this.sessionService.isUserInRole('ROLE_BRANCH_ENABLEMENT_SPECIALIST')) {
      this.getApplicants();
      //}
      this.checkIsAlreadyApplied();
    });
  }

  load(id) {
    this.servicesService.getOpportunity(id).subscribe(
      (data) => {
        this.res = data.entries[0];
        this.formReady = true;

        this.data = {
          data: {
            "jobTitle": this.res.name,
            "id": this.res.number,
            "city": this.res.city,
            "organization": this.res.employer,
            "description": this.res.description,
            "salaryNegotiation": this.res.salaryType,
            "opportunityDetailsPanelColumnsExpectedSalaryinSar": this.res.salaryAmount,
            "applicationStartDate": this.res.from,
            "applicationEndDate": this.res.to,
            "educationLevel": this.res.education,
            "opportunityDetailsPanelColumnsPositionsCounts": this.res.vacancies,
            "requirements": this.res.requirements,
            "qualifications": this.res.qualifications,
            "certificates": this.res.certificates,
            "requiredExperienceYears": this.res.yearsOfExperience,
            "notes": this.res.notes,
            "branchId": "_STATIC_EXAMPLE_"
          }
        }

        this.checkIsWithinDate();

      })
  }

  getApplicants() {
    this.servicesService.getApplicants(this.oppId).subscribe(res => {
      console.log('applicants', res.entries);
      this.applicants = res.entries;
      this.displayedColumns = ['name', 'nid', 'birthdate', 'mobile', 'city', 'title', 'education', 'checkbox', 'actions'];

      res.entries.forEach(x => {
        if (x.isContacted == 1) {
          this.checkboxCandidates[x._id] = true
        } else {
          this.checkboxCandidates[x._id] = false
        }
      });
    })
  }

  async checkIsAlreadyApplied() {

    this.accountService.getAccount().toPromise().then(res => {
      this.userId = res['login'];
    }
    ).then(
      () => {
        this.servicesService.getApplicantById(this.oppId, this.userId).subscribe(res => {
          if (res.entries.length) this.isAlreadyApplied = true;
        })
      }
    );

  }

  checkIsWithinDate() {
    let now = new Date().toString();
    now = this.datePipe.transform(now, 'yyyy-MM-dd');
    let from = this.datePipe.transform(this.res.from, 'yyyy-MM-dd')
    let to = this.datePipe.transform(this.res.to, 'yyyy-MM-dd')
    if (to >= now && from <= now) {
      console.log('date valdtn true->', from, now, to)
      this.isWithinDate = true;
    }
  }

  selectAllCandidates() {
    if (this.isAllCandidates == false) {
      for (let key in this.checkboxCandidates) {
        this.checkboxCandidates[key] = true
      }
      this.isAllCandidates = true;
    } else {
      for (let key in this.checkboxCandidates) {
        this.checkboxCandidates[key] = false
      }
      this.isAllCandidates = false;
    }
  }

  sendToCandidates() {
    this.selectedCandidates = [];
    for (let key in this.checkboxCandidates) {
      if (this.checkboxCandidates.hasOwnProperty(key) && this.checkboxCandidates[key] == true) {
        this.selectedCandidates.push(`${key}`);
      }
    }
    console.log('sendToCandidates', this.selectedCandidates)
    this.openDialog();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MessageDialog, {
      width: '60%',
      data: { candidates: this.selectedCandidates, oppId: this.oppId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.selectedCandidates = result;
    });
  }

}

@Component({
  selector: 'message-dialog',
  templateUrl: 'message-dialog.html',
})
export class MessageDialog {

  constructor(
    private contactCandidatesService: ContactCandidatesService,
    private router: Router,
    public dialogRef: MatDialogRef<MessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  message: string;
  onNoClick(): void {
    this.dialogRef.close();
  }

  sendMessage() {
    if (this.message.length) {
      // this.contactCandidatesService.contactCandidates(this.data.candidates,this.data.oppId,this.message).toPromise().then(()=>{
      //   setTimeout(()=>{
      //     this.dialogRef.close()
      //   },2000)
      //   }
      // )

      this.data.candidates.forEach(candidateObj => {
        this.contactCandidatesService.contactCandidates(candidateObj, this.message).toPromise().then(() => {
          console.log('isContacted updated for', candidateObj)
        }
        )
      });

      this.dialogRef.close()
      this.router.navigate(['/']);


    } else {
      //alert('empty message, please add a message')
    }
  }
  onSubmit(event) {

  }
  onCustomEvent(event) {

  }
}