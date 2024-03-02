import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../services/api.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-modal-tarif',
  templateUrl: './modal-tarif.component.html',
  styleUrl: './modal-tarif.component.scss'
})
export class ModalTarifComponent implements OnInit {
  @Input() isVisible = false;
  @Output() closeModal = new EventEmitter<any>;
  categories: any = [];
  selectedCats: any = [];
  price = 14990;

  constructor(private apiService: ApiService,
              private message: NzNotificationService) {
  }

  showLog(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.apiService.getCategories().subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.closeModal.emit();
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.closeModal.emit();
  }

  getAccess(): void {
    const companyJSON: any = localStorage.getItem('company');
    const company: any = JSON.parse(companyJSON);
    const token = '7061050517:AAGYkWmC2gb0t5o6oJwI3RlqlBZRBvomlXs'; // Замените на токен вашего бота
    const text = `Заявка на доступ к кандидатам \n
    Компания: ${company.CompanyName},\n
    Конт. Лицо: ${company.FullName},\n
    Телефон: +${company.PhoneNumber},\n
    Категории: ${this.selectedCats.join(', ')}\n
    На сумму: ${this.price * this.selectedCats.length}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${978152775}&text=${encodeURIComponent(text)}`)
      .then(response => response.json())
      .then(data => {
        this.message.success('Мы получили вашу заявку', 'Ожидайте звонка, на номер указанный при регистрации', {nzDuration: 0});
        this.handleOk();
        this.selectedCats = [];
      })
      .catch(err => console.error(err));

  }
}
