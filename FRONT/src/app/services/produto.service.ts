import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = environment.baseUrl + '/produto';

  constructor(private http: HttpClient, public router: Router) { }

  buscaListaProdutos(filtro: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/buscaLista`, filtro).pipe(
      map((response) => response)
    );
  }

  excluirProduto(data: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/excluir?id=` + data.id).pipe(
      map((response) => response)
    );
  }

  salvarProduto(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/salvar`, data).pipe(
      map((response) => response)
    );
  }
}
