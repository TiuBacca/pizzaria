import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpStatusCode,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

@Injectable()
export class RequestHandleInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === HttpStatusCode.NoContent)
            this.alertService.showWarningMessage('Nenhum registro encontrado!');
          if (event.status == HttpStatusCode.GatewayTimeout)
            this.alertService.showWarningMessage('Erro ao comunicar com servidor');
          if (event.status == HttpStatusCode.Forbidden)
            this.alertService.showWarningMessage('Token expirado, faça login novamente!');
        }
      }), catchError((error: HttpErrorResponse) => {
        if (error.error.descricao) {
          this.alertService.showErrorMessage(error.error.descricao);
        } else if (error.error.message) {
          if (error.error.message === 'Access is denied') {
            this.alertService.showWarningMessage('Token expirado, faça login novamente!');
            this.logout();
          } else {
            this.alertService.showErrorMessage(error.error.message);
          }
        }
        return throwError(() => error);
      })
    );
  }

  logout() {
    const rotaLogout = sessionStorage.getItem('rotalogout');
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      window.location.href = rotaLogout != null ? rotaLogout : '/';
    }, 3000);
  }
}
