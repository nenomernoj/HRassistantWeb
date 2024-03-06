import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private msg: NzMessageService) {
  }

  validateForm!: FormGroup;
  loading = false;
  showVacation = false;
  isVisibleTarif = false;

  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      workSchedule: [null, [Validators.required]],
      responsibilities: [null, [Validators.required]],
      requirements: [null, [Validators.required]],
      address: [null, [Validators.required]],
      contactPhone: [null, [Validators.required]],
      contactWhatsApp: [null, [Validators.required]],
      author: [null, [Validators.required]],
      city: [null, [Validators.required]]
    });
  }

  checkAuth(): void {
    console.log('checkAuth');
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.isVisibleTarif = true;
    } else {
      this.authService.openAuthModalComponent(true)
    }
  }

  checkAuthForKey(): void {
    const companyJSON: any = localStorage.getItem('company');
    const company: any = JSON.parse(companyJSON);
    const token = '7061050517:AAGYkWmC2gb0t5o6oJwI3RlqlBZRBvomlXs'; // Замените на токен вашего бота
    const text = `Подбор кандидатов под ключ \n
    Компания: ${company.CompanyName},\n
    Конт. Лицо: ${company.FullName},\n
    Телефон: +${company.PhoneNumber},\n}`;
    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${978152775}&text=${encodeURIComponent(text)}`)
      .then(response => response.json())
      .then(data => {
        this.msg.success('Мы получили вашу заявку');
        this.validateForm.reset();
        this.handleCancel();
      })
      .catch(err => console.error(err));

    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${657951499}&text=${encodeURIComponent(text)}`)
      .then(response => response.json())
      .then(data => {
        this.validateForm.reset();
        this.handleCancel();
      })
      .catch(err => console.error(err));
  }

  handleCancel(): void {
    this.showVacation = false;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.loading = true;
      const data = this.validateForm.value;
      console.log(data);
      const token = '7061050517:AAGYkWmC2gb0t5o6oJwI3RlqlBZRBvomlXs'; // Замените на токен вашего бота
      const text = `Заявка на публикацию вакансии \n
      Название: ${data.title}\n
      Компания: ${data.author}\n
Адрес: ${data.address}\n
Город: ${data.city}\n
Телефон: ${data.contactPhone}\n
Ватсап: ${data.contactWhatsApp}\n
Требования: ${data.requirements}\n
Обязанности: ${data.responsibilities}\n
Зарплата: ${data.salary}\n
Рассписание: ${data.workSchedule}\n
`;

      fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${978152775}&text=${encodeURIComponent(text)}`)
        .then(response => response.json())
        .then(data => {
          this.msg.success('Мы получили вашу заявку');
          this.validateForm.reset();
          this.handleCancel();
        })
        .catch(err => console.error(err));

      fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${657951499}&text=${encodeURIComponent(text)}`)
        .then(response => response.json())
        .then(data => {
          this.validateForm.reset();
          this.handleCancel();
        })
        .catch(err => console.error(err));
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
