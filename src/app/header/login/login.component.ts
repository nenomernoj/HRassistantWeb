import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private fb: NonNullableFormBuilder,
              private message: NzMessageService,
              private authService: AuthService) {
  }

  @Output() showRegisteration = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<string>();
  loading = false;
  validateForm: FormGroup<{
    phone_number: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    phone_number: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const data = {...this.validateForm.value};
      data.phone_number = '7' + data.phone_number;
      this.loading = true;
      this.authService.login(data).subscribe(res => {

        console.log(res);
        this.authService.setAccessToken(res.accessToken);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.message.success('Вы вошли в систему');
        this.loading = false;
        this.closeModal.emit();
      }, err => {
        this.loading = false;
        console.log(err);
        this.message.error(err.error.message);
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  showRegisterForm(): void {
    this.showRegisteration.emit();
  }
}
