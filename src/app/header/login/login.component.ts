import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private fb: NonNullableFormBuilder,
              private authService: AuthService) {
  }

  @Output() showRegisteration = new EventEmitter<string>();
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
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.loading = false;
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        this.loading = false;
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
