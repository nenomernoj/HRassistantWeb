import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

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
