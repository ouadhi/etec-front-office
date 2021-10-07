import { Injector, Input, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { ErrorToast, FormioLoader } from 'src/formio/src/public_api';
import { ManagePasswordService } from '../manage-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  // styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FormioLoader],
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {
  @Input() userId: string;
  @Input() token: string;
  formGroup: FormGroup;

  password = '';
  confirmPassword = '';

  constructor(public injector: Injector,
    private formBuilder: FormBuilder,
    private managePasswordService: ManagePasswordService) {
    super(injector);

    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit() {
    this.formioLoader.loading = false;
  }

  confirm() {
    this.formioLoader.loading = true;
    this.sub = this.managePasswordService.resetPassword(this.userId, this.token, this.formGroup.value.password)
      .subscribe(data => {
        this.formioLoader.loading = false;
        this.keycloakService.login({redirectUri : location.origin})
      }, error => {
        this.formioLoader.loading = false;
        this.showError();
      });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  private showError() {
    this.toastrService.show(
      this.translateService.instant('generalError'),
      this.translateService.instant('ErrorOccurred'),
      {
        toastClass: 'notification-toast',
        closeButton: true,
        enableHtml: true,
        toastComponent: ErrorToast
      });
  }
}
