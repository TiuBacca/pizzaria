import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public router: Router) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      map((response) => response)
    );
  }

  validarEmailService(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/validaLogin`, { email: data.email }).pipe(
      map((response) => response)
    );
  }

}
