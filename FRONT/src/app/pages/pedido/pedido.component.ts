import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ConfigService } from 'src/app/services/config.service';
import { SituacaoPedido } from '../objetos/SituacaoPedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  paginaGridInicial: number = 1;

  pedidos: any;

  listaCombos: { [key: string]: any } = {};
  inputFiltros: { [key: string]: any } = {};
  listaConfigCombos: { [key: string]: any } = {};

  constructor(private configService: ConfigService, private alertService: AlertService, private pedidoService: PedidoService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.alimentaComboSituacao()
  }

  limpar(){
    this.pedidos = [];
    this.paginaGridInicial = 1;
    this.inputFiltros = [];
  }

  pesquisar(){
    this.pedidoService.buscaListaPedidosByFiltro(this.inputFiltros).subscribe((response) => {
      this.pedidos = response ? response : [];
    })
  }

  alimentaComboSituacao() {
    this.listaCombos['situacao'] = Object.entries(SituacaoPedido).map(([chave, descricao]) => ({
      chave,
      descricao
    })).sort((a, b) => a.descricao.localeCompare(b.descricao));

    this.listaConfigCombos['situacao'] = this.configService.setConfigDropDownSetting(false, 'chave', 'descricao');
  }

}
