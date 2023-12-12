import {Component, OnInit} from '@angular/core';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.notification.warning('Сайт в разработке', 'Данный портал находится в процессе разработки, мы скоро закончим все работы, спасибо за ожидание', {nzDuration: 0})
  }

  showRegisterform = false;
  visibaleAuthModal = false;


  handleCancel(): void {
    this.visibaleAuthModal = false;
  }

  handleOk(): void {
    this.visibaleAuthModal = false;
  }

  checkAuth(): void {
    const auth = false;
    if (auth) {

    } else {
      this.visibaleAuthModal = true;
    }
  }
}
