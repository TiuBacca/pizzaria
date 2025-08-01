import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientePedidosComponent } from './modais/cliente-pedidos/cliente-pedidos.component';
import { Cliente } from '../objetos/Cliente';
import { NovoClienteComponent } from './modais/novo-cliente/novo-cliente.component';
import { SituacaoCliente } from '../objetos/SituacaoCliente';
import { ConfigService } from 'src/app/services/config.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  paginaGridInicial: number = 1;

  inputFiltros: { [key: string]: any } = {};
  clientes: Cliente[] = [];

  listaCombos: { [key: string]: any } = {};
  listaConfigCombos: { [key: string]: any } = {};

  @ViewChild("clientePedidos")
  modalClientePedidos!: ClientePedidosComponent;

  @ViewChild("novoCliente")
  modalNovoCliente!: NovoClienteComponent;

  constructor(private configService: ConfigService, private clienteService: ClienteService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.clientes = [
      new Cliente({
        id: 1,
        nome: 'Maria',
        situacao: SituacaoCliente.ATIVO,
        ultimoPedido: { id: 101, data: '2025-06-01' }
      }),
      new Cliente({
        id: 2,
        nome: 'João',
        situacao: SituacaoCliente.PENDENTE
      }),
      new Cliente({
        id: 3,
        nome: 'Ana',
        situacao: SituacaoCliente.ATIVO,
        ultimoPedido: { id: 102, data: '2025-06-10' }
      }),
      new Cliente({
        id: 4,
        nome: 'Carlos',
        situacao: SituacaoCliente.INATIVO,
        ultimoPedido: { id: 103, data: '2025-06-15' }
      }),
      new Cliente({
        id: 5,
        nome: 'Beatriz',
        situacao: SituacaoCliente.ATIVO
      })
    ];

    this.alimentaComboSituacao();

  }

  alimentaComboSituacao() {
    this.listaCombos['listaSituacao'] = Object.entries(SituacaoCliente).map(([chave, descricao]) => ({
      chave,
      descricao
    })).sort((a, b) => a.descricao.localeCompare(b.descricao));

    this.listaConfigCombos['configSituacao'] = this.configService.setConfigDropDownSetting(false, 'chave', 'descricao');
  }

  pesquisar() {
    this.clienteService.buscaListaClientes(this.inputFiltros).subscribe((response) => {
      this.clientes = response ? response : []
    })
  }

  limpar() {
    this.inputFiltros = [];
    this.clientes = [];
  }

  adicionarCliente() {

  }

  openModalPedido(item: any) {
    this.modalClientePedidos.openModal(item);
  }


  openModalInformacoes(item: any) {
    this.modalNovoCliente.openModal(item)
      .then((res: any) => {
        this.pesquisar();
      })
      .catch((err: any) => {

      });
  }

  openModalNovoCliente() {

    this.modalNovoCliente.openModal(null)
      .then((res: any) => {
        this.pesquisar();
      })
      .catch((err: any) => {

      });
  }

  async alterarSituacaoCliente(cliente: any) {

    const confirmado = await this.alertService.confirmarAcao('Você realmente deseja alterar a situação deste cliente?');

    if (confirmado) {
      var data = {
        id: cliente.id,
        situacao: cliente.situacao != 'Ativo'
      }

      console.log(data)
      this.clienteService.alterarSituacao(data).subscribe((response) => {
        if (response) {
          this.alertService.showSucessMessage(response)
        }
      })
    }
  }
}
