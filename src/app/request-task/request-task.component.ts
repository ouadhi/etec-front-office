import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { ModalController } from '@ionic/angular';


/**
 * Main Task Component
 */
@Component({
  selector: 'app-request-task',
  templateUrl: './request-task.component.html',
  styleUrls: ['./request-task.component.scss'],

})
export class RequestTaskComponent implements OnInit {
  task: any = {};
  public max = 65;
  public mainWidth = 65;
  public seperator = true;
  public showComments = true;
  public showCommentsPopup = false;
  form = {
    formKey: '',
    readOnly: false,
    version: {},
    ready: false
  };
  params;
  /*
  submitPromise: Promise<any>;
  submitPromiseResolve: any;
*/

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public modalController: ModalController

  ) {
    //

  }

  /**
   * Go Back After Task is completed and return navigation promise
   */
  goBack() {
    /* return this.router.navigate(['tasks',
       ...(this.route.parent.snapshot.params.filterId ? [this.route.parent.snapshot.params.filterId] : [])]);*/
    this.router.navigate(['../../'], { relativeTo: this.route });

  }


  /**
   * On Form Submit Event Callback
   *  @param submission
   *  Submission Object
   */
  onSubmit(submission) {
    this.goBack();
  }



  /**
   * ngOnInit: on init subscribe to route changes
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.form.ready = false;
      this.params = [{
        url: `${environment.task.api}feasibilityStudySupportCase/${params.caseId}`,
        parallel: false,
        success: `submission.data = {...response.data, taskId:"${params.taskId}", requestId:"${params.requestId}"};`
      }];
      this.form.formKey = params.formKey;

      setTimeout(() => {
        this.form.ready = true;
      }, 0);
    });
  }


}
