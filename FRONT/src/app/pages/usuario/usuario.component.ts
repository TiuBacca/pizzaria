import { Component, OnInit, ViewChild } from '@angular/core';
import { NovoPedidoComponent } from './pedido/novo-pedido/novo-pedido.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  listaCompras: any;


  @ViewChild("novoPedido")
  novoPedido!: NovoPedidoComponent;

  constructor() { }

  ngOnInit(): void {
  }

  clicarAbrirModalNovoPedido(){
    // this.novoPedido.openModal({})
    //   .then((res: any) => {
    //   })
    //   .catch((err: any) => {

    //   });

     this.novoPedido.openModal()

  }

  exibirHistoricoPedidos() {

  }


}
