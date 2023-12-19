import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  loadingSendSms = false;
  otp: any = '';
  validateForm: FormGroup<{
    phoneNumber: FormControl<string>;
    companyName: FormControl<string>;
    fullName: FormControl<string>;
    whatsAppNumber: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder,
              private authService: AuthService,
              private msg: NzMessageService) {
    this.validateForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      whatsAppNumber: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };
  @Output() showLogin = new EventEmitter<string>();
  step = 1;

  showLog(): void {
    this.showLogin.emit();
  }

  submitForm(): void {
    console.log(this.validateForm);
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.sendSMS();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  sendSMS(): void {
    this.loadingSendSms = true;
    const data = {phone_number: '7' + this.validateForm.controls.phoneNumber.value}
    this.authService.sendSMS(data).subscribe(res => {
      console.log(res);
      this.step = 2;
      this.loadingSendSms = false;
    }, err => {
      console.log(err);
      this.loadingSendSms = false;
      this.msg.error(err.error.error);
      if (err.error.error === 'Прошло менее 2 минут') {
        this.step = 2;
      }
    })
  }

  renderTitle(): string {
    switch (this.step) {
      case 1:
        return 'Регистрация';
      case 2:
        return 'SMS код';
      default:
        return 'Регистрация'
    }
  }

  smsConfirm(): void {
    console.log(this.otp);
    const data: any = {...this.validateForm.value};
    data.phoneNumber = '7' + data.phoneNumber;
    data.smsCode = this.otp;
    this.loadingSendSms = true;
    this.authService.registerOrg(data).subscribe(res => {
      this.msg.success(res.message);
      this.loadingSendSms = false;
      this.showLogin.emit();
    }, err => {
      this.loadingSendSms = false;
      this.msg.error(err.error.error);
    })
  }
}
