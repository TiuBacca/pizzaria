import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  baseUrl = environment.baseUrl + '/pedido';

  constructor(private http: HttpClient, public router: Router) { }

  buscaListaPedidosByFiltro(filtro: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/buscaLista`, filtro).pipe(
      map((response) => response)
    );
  }
}
