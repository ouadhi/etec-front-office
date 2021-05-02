import { Component } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: '[success-toast-component]',
  styleUrls: ['../common-toast.component.scss', './success-toast.component.scss'],
  template: `
        <div class="row toast-content" [style.display]="state.value === 'inactive' ? 'none' : ''">
        <div class="col-2 toast-prefix notification-prefix">
          <i class="fa fa-check-circle"></i>
        </div>
        <div class="col-9 m-vertical">
          <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
            {{ title }}
          </div>
          <div *ngIf="message && !options.enableHtml" role="alert" aria-live="polite"
            [class]="options.messageClass" [attr.aria-label]="message">
            {{ message }}
          </div>
        </div>
        <div class="col-1 m-vertical text-end">
          <i *ngIf="options.closeButton" (click)="remove()" class="fa fa-close"></i>
        </div>
      </div>
      <div *ngIf="options.progressBar">
        <div class="toast-progress" [style.width]="width + '%'"></div>
      </div>
    `,
  preserveWhitespaces: false,
})
export class SuccessToast extends Toast {
  // used for demo purposes
  undoString = 'undo';

  // constructor is only necessary when not using AoT
  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }

  action(event: Event) {
    event.stopPropagation();
    this.undoString = 'undid';
    this.toastPackage.triggerAction();
    return false;
  }
}