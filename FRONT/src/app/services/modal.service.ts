import { Injectable } from '@angular/core';
import { NovoContatoComponent } from '../pages/cliente/modais/novo-contato/novo-contato.component';
import { NovoEnderecoComponent } from '../pages/cliente/modais/novo-endereco/novo-endereco.component';
import { NovoPedidoComponent } from '../pages/pedido/modais/novo-pedido/novo-pedido.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private _modalNovoContato!: NovoContatoComponent;
  private _modalNovoEndereco!: NovoEnderecoComponent;
  private _modalNovoPedido!: NovoPedidoComponent

  get modalNovoPedido(): NovoPedidoComponent {
    return this._modalNovoPedido;
  }

  set modalNovoPedido(modal: NovoPedidoComponent) {
    this._modalNovoPedido = modal;
  }

  get modalNovoContato(): NovoContatoComponent {
    return this._modalNovoContato;
  }

  set modalNovoContato(modal: NovoContatoComponent) {
    this._modalNovoContato = modal;
  }

  get modalNovoEndereco(): NovoEnderecoComponent {
    return this._modalNovoEndereco;
  }

  set modalNovoEndereco(modal: NovoEnderecoComponent) {
    this._modalNovoEndereco = modal;
  }
}

