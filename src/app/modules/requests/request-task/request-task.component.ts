
import { Injector } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { environment } from 'src/environments/environment';
import { SuccessToast } from 'src/formio/src/lib/modules/toast/success-toast/success-toast.component';
import { CaseActivityService } from '../case-activities.service';

/**
 * Main Task Component
 */
@Component({
  selector: 'app-request-task',
  templateUrl: './request-task.component.html',
  styleUrls: ['./request-task.component.scss'],

})
export class RequestTaskComponent extends BaseComponent implements OnInit {
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

  constructor(public injector: Injector,
    public modalController: ModalController,
    public caseActivity: CaseActivityService) { super(injector); }

  /**
   * Go Back After Task is completed and return navigation promise
   */
  goBack() {
    /* return this.router.navigate(['tasks',
       ...(this.route.parent.snapshot.params.filterId ? [this.route.parent.snapshot.params.filterId] : [])]);*/
    this.location.back();
  }


  /**
   * On Form Submit Event Callback
   *  @param submission
   *  Submission Object
   */
  onSubmit(submission) {
    this.toastrService.show(
      this.translateService.instant('SERVICE.BENEFICIARY_TASK_SUCCESS'),
      this.translateService.instant('OperationDone'),
      {
        toastClass: 'notification-toast',
        closeButton: true,
        enableHtml: true,
        toastComponent: SuccessToast
      });
    this.goBack();
  }



  /**
   * ngOnInit: on init subscribe to route changes
   */
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.sub = this.caseActivity.getRequestTask(params.taskId).subscribe(data => {
        if (data.formKey) {
          this.form.ready = false;
          this.params = [{
            url: `${environment.gateway}${environment.endpoints.humanTask}${data.formKey.replace('{caseId}', params.caseId)}`,
            parallel: false,
            success: `submission.data = {...response.data, taskId:"${params.taskId}", requestId:"${params.requestId}"};`
          }];
          this.form.formKey = data.formKey.split('/')[2];

          setTimeout(() => {
            this.form.ready = true;
          }, 0);
        }
      });

    });
  }


}
