import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {catchError, switchMap, tap, take, filter} from 'rxjs/operators';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private auth: AuthService, private notification: NzNotificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        } else if (error.status === 400 && error.error) {
          this.handle400Error(error);
          return throwError(error);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.auth.refreshTokens().pipe(
        switchMap((tokens: any) => {
          if (tokens && tokens.accessToken && tokens.refreshToken) {
            this.auth.setAccessToken(tokens.accessToken);
            this.auth.setRefreshToken(tokens.refreshToken);
            this.refreshTokenSubject.next(tokens.accessToken);
            return next.handle(this.addToken(request, tokens.accessToken));
          }

          // Если получение новых токенов не удалось, редирект на страницу входа
          return this.logoutUser();
        }),
        catchError(error => {
          // Если обновление токена также вызвало ошибку, перенаправляем на страницу входа
          return this.logoutUser();
        }),
        tap(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addToken(request, accessToken));
        })
      );
    }
  }

  private handle400Error(error: HttpErrorResponse) {
    if (error.error) {
      this.notification.error('Ошибка', error.error.message);
    }
  }

  private logoutUser() {
    this.auth.logout(); // Предполагается, что у вас есть метод выхода, который очищает токены и делает редирект на страницу входа
    return throwError('Token refresh failed, user logged out.');
  }
}
