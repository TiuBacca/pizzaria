import { Component, OnInit } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-cliente-pedidos',
  templateUrl: './cliente-pedidos.component.html',
  styleUrls: ['./cliente-pedidos.component.css']
})
export class ClientePedidosComponent implements OnInit {


  pedidos: any;
  paginaPedidos: any = 1;

  listaCombos: { [key: string]: any } = {};
  listaConfigCombos: { [key: string]: any } = {};

  modalClientePedidos: any;

  constructor() { }

  ngOnInit(): void {
  }

  openModal(item: any) {
    this.iniciaModal();
    this.modalClientePedidos.show();
  }

  iniciaModal() {
    this.modalClientePedidos = new window.bootstrap.Modal(document.getElementById('modalClientePedidos'))
  }
}
