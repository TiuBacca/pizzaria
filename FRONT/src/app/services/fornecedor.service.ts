import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  baseUrl = environment.baseUrl + '/fornecedor';


  constructor(private http: HttpClient, public router: Router) { }

  buscaListaFornecedores(filtro: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/buscaLista`, filtro).pipe(
      map((response) => response)
    );
  }

  salvarFornecedor(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/salvar`, data).pipe(
      map((response) => response)
    );
  }

  excluirFornecedor(data: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/excluir?id=` + data.id).pipe(
      map((response) => response)
    );
  }

  buscarHistoricoPedisoPorFornecedor(data: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/historico/pedido/buscaLista?id=` + data.id).pipe(
      map((response) => response)
    );
  }

  gerarPedido(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/pedido/gerar`, data).pipe(
      map((response) => response)
    );
  }

  salvarNovoProduto(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/produto/salvar`, data).pipe(
      map((response) => response)
    );
  }

  excluirProduto(data: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/produto/excluir?id=` + data.id).pipe(
      map((response) => response)
    );
  }

  buscarListaProdutosPorFornecedor(data: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/produto/buscaLista?id=` + data.id).pipe(
      map((response) => response)
    );
  }

}
