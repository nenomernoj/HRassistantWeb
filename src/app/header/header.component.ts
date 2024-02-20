import {Component, OnInit} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  company: any = null;
  isVisibleTarif = false;

  ngOnInit() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.authService.setAccessToken(accessToken);
    }
    this.authService.accessTokenSubject.subscribe(value => {
      if (value) {
        const company: any = jwtDecode(value);
        this.company = company.org;
        console.log(this.company);
        localStorage.setItem('company', JSON.stringify(this.company));
      }
    });
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

  logout(): void {
    localStorage.clear();
    window.location.href = '/';
  }

  openTarifModal(): void {

  }
}
