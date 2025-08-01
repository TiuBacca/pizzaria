import { Component, OnInit} from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-historico-compras',
  templateUrl: './historico-compras.component.html',
  styleUrls: ['./historico-compras.component.css']
})
export class HistoricoComprasComponent implements OnInit {


  historico: any; 
  pagicaHistoricoCompras = 1;

  modalHistoricoCompras: any;

  constructor() { }

  ngOnInit(): void {
    this.historico = [{
      id: 1,
      valor: 50.32,
      data: '05/10/2024',
      comprador: {id: 2, nome: 'nome teste'},
      fornecedor: {id: 53, nome: 'pastelaria'}
    }]
  }


  iniciaModal() {
    this.modalHistoricoCompras = new window.bootstrap.Modal(document.getElementById('modalHistoricoCompras'))
  }

    openModal(item: any) {
    this.iniciaModal();
    this.modalHistoricoCompras.show();
  }

}
