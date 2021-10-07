import { Injector, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base.component';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  // styleUrls: ['./otp-verification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OtpVerificationComponent extends BaseComponent implements OnInit {
  @Output() verified = new EventEmitter<void>();
  formGroup = new FormGroup({
    // phone: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
  });

  counter = 0;
  counterSubscription: Subscription;

  phone = '';
  code = '';

  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
  }

  resendVerification(event) {
    if (this.counterSubscription) return;
    event.stopPropagation();
    // call api
    this.startTimer();
  }

  checkVerify() {
    // call api
    this.verified.emit();
  }

  private startTimer(base: number = 60) {
    this.counter = base;
    this.counterSubscription = interval(1000)
      .subscribe(() => {
        this.counter--;
        if (this.counter == 0) {
          this.counterSubscription.unsubscribe();
          this.counterSubscription = null;
        }
      });
  }
}
