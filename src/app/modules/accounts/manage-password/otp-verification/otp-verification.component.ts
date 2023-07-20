import {
  Injector,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  AfterContentChecked,
  AfterViewInit,
} from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { forkJoin, interval, Subscription } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base.component";
import {
  ErrorToast,
  FormioLoader,
  SuccessToast,
} from "dp-formio";
import { ManagePasswordService } from "../manage-password.service";

@Component({
  selector: "app-otp-verification",
  templateUrl: "./otp-verification.component.html",
  // styleUrls: ['./otp-verification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FormioLoader],
})
export class OtpVerificationComponent extends BaseComponent implements OnInit {
  @Input() userId: string;
  @Output() verified = new EventEmitter<string>();
  formGroup = new FormGroup({
    // phone: new FormControl('', [Validators.required]),
    code: new FormControl("", [Validators.required]),
  });

  counter = 0;
  counterSubscription: Subscription;

  phone = "";
  code = "";
  translatedKeys = [];
  otpchannel = null;

  constructor(
    public injector: Injector,
    private managePasswordService: ManagePasswordService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.sub = forkJoin([
      this.translateService
        .get([
          "ManagePassword.Verification code has been sent",
          "OperationDone",
          "ErrorOccurred",
          "generalError",
          "ManagePassword.Invalid verification code",
        ]),
      this.managePasswordService.getFormConfig()
    ])
      .subscribe((data) => {
        this.translatedKeys = data[0];
        this.otpchannel = data[1]?.config?.otpchannel;
        this.sendOTP();
      });
  }

  resendVerification(event) {
    if (this.counterSubscription) return;
    event.stopPropagation();
    this.sendOTP();
  }

  checkVerify() {
    this.formioLoader.loading = true;
    this.sub = this.managePasswordService
      .verify(this.userId, this.formGroup.value.code)
      .subscribe(
        (data) => {
          this.formioLoader.loading = false;
          this.verified.emit(data.msg);
        },
        (error) => {
          this.formioLoader.loading = false;
          this.showError(
            this.translatedKeys["ErrorOccurred"],
            this.translatedKeys["ManagePassword.Invalid verification code"]
          );
        }
      );
  }

  private sendOTP() {
    this.formioLoader.loading = true;
    this.sub = this.managePasswordService.generateOTP(this.userId, this.otpchannel).subscribe(
      (data) => {
        this.formioLoader.loading = false;
        this.startTimer();
        this.toastrService.show(
          this.translatedKeys["ManagePassword.Verification code has been sent"],
          this.translatedKeys["OperationDone"],
          {
            toastClass: "notification-toast",
            closeButton: true,
            enableHtml: true,
            toastComponent: SuccessToast,
          }
        );
      },
      (error) => {
        this.formioLoader.loading = false;
        this.showError(
          this.translatedKeys["ErrorOccurred"],
          this.translatedKeys["generalError"]
        );
      }
    );
  }

  private showError(title: string, message: string) {
    this.toastrService.show(message, title, {
      toastClass: "notification-toast",
      closeButton: true,
      enableHtml: true,
      toastComponent: ErrorToast,
    });
  }

  private startTimer(base: number = 60) {
    this.counter = base;
    this.counterSubscription = interval(1000).subscribe(() => {
      this.counter--;
      if (this.counter == 0) {
        this.counterSubscription.unsubscribe();
        this.counterSubscription = null;
      }
    });
  }
}
