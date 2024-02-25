import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(private fb: NonNullableFormBuilder,
              private authService: AuthService,
              private msg: NzMessageService) {
  }

  validateForm!: FormGroup;

  ngOnInit() {
    const companyStringData: any = localStorage.getItem('company');
    const companyData = JSON.parse(companyStringData);
    console.log(companyData);
    this.validateForm = this.fb.group({
      companyName: [companyData.CompanyName, [Validators.required]],
      fullName: [companyData.FullName, [Validators.required]],
      whatsAppNumber: [companyData.WhatsAppNumber, [Validators.required]],
      email: [companyData.Email, [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.authService.updateOrg(this.validateForm.value).subscribe(res => {
        console.log(res);
        this.authService.refreshTokens().subscribe(res2 => {
          this.msg.success('Данный сохранены');
        })
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }
}
