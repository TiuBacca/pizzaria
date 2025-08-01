import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  baseUrl = environment.baseUrl + '/contato';


  constructor(private http: HttpClient, public router: Router) { }

  buscaListaContatos(data: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/buscaLista?id=` + data.id).pipe(
      map((response) => response)
    );
  }

  excluirContato(data: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/excluir?id=` + data.id).pipe(
      map((response) => response)
    );
  }

  salvarContato(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/salvar`, data).pipe(
      map((response) => response)
    );
  }
}
