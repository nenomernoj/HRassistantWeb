import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  openAuthModalSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
  }

  sendSMS(data: any): Observable<any> {
    return this.http.post(`/org/getOtp`, data);
  }

  registerOrg(data: any): Observable<any> {
    return this.http.post(`/org/registerOrganization`, data);
  }

  getAccessToken(): BehaviorSubject<string> {
    return this.accessTokenSubject.value;
  }

  setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
    this.accessTokenSubject.next(token);
  }

  getRefreshToken(): string {
    const token = localStorage.getItem('refreshToken');
    return token ? token : '';
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
    this.refreshTokenSubject.next(token);
  }

  openAuthModalComponent(isOpen: boolean): void {
    console.log(isOpen);
    if (isOpen) {
      this.openAuthModalSubject.next('open');
    }
  }

  refreshTokens(): Observable<{ accessToken: string, refreshToken: string }> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token found!');
    }

    return this.http.post<{ accessToken: string, refreshToken: string }>(`/org/refresh`, {refreshToken})
      .pipe(
        tap(tokens => {
          this.setAccessToken(tokens.accessToken);
          this.setRefreshToken(tokens.refreshToken);
        })
      );
  }

  register(data: any): Observable<any> {
    return this.http.post(`/api/Account/Register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`/org/login`, data);
  }

  updateOrg(data: any): Observable<any> {
    return this.http.put(`/org/updateOrganization`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`/api/Account/ResetPassword`, data);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.accessTokenSubject.next(null);
    this.refreshTokenSubject.next(null);
    // здесь мог быть ваш код для редиректа на страницу входа или главную страницу
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
