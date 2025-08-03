import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  baseUrl = environment.baseUrl + '/funcionario';

  constructor(private http: HttpClient, public router: Router) { }

  buscaListaFuncionarios(filtro: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/buscaLista`, filtro).pipe(
      map((response) => response)
    );
  }

  salvarFuncionario(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/salvar`, data).pipe(
      map((response) => response)
    );
  }

  adicionarAdvertencia(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/advertencia?id=${data.id}`, {}).pipe(
      map(response => response)
    );

  }

  demitirFuncionario(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/demitir?id=${data.id}`, {}).pipe(
      map(response => response)
    );

  }

  concederFerias(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ferias`, data).pipe(
      map(response => response)
    );

  }

}
