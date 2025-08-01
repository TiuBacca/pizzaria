import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl = environment.baseUrl + '/cliente';

  constructor(private http: HttpClient, public router: Router) { }

  buscaListaClientes(filtro: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/buscaLista`, filtro).pipe(
      map((response) => response)
    );
  }

  salvarCliente(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/salvar`, data).pipe(
      map((response) => response)
    );
  }


  alterarSituacao(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/alterarSituacao`, data).pipe(
      map((response) => response)
    );
  }

}
