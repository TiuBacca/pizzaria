import { Component, OnInit, ViewChild } from '@angular/core';
import { Fornecedor } from '../objetos/Fornecedor';
import { SituacaoFornecedor } from '../objetos/SituacaoFornecedor';
import { ConfigService } from 'src/app/services/config.service';
import { NovoFornecedorComponent } from './modais/novo-fornecedor/novo-fornecedor.component';
import { HistoricoFornecedorComponent } from './modais/historico-fornecedor/historico-fornecedor.component';
import { ProdutoFornecedorComponent } from './modais/produto-fornecedor/produto-fornecedor.component';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  paginaGridInicial: number = 1;

  inputFiltros: { [key: string]: any } = {};
  fornecedores: Fornecedor[] = [];

  listaCombos: { [key: string]: any } = {};
  listaConfigCombos: { [key: string]: any } = {};

  @ViewChild("modalNovoFornecedor")
  modalNovoFornecedor!: NovoFornecedorComponent;

  @ViewChild("modalHistoricoFornecedor")
  modalHistoricoFornecedor!: HistoricoFornecedorComponent;

  @ViewChild("modalProdutoFornecedor")
  modalProdutoFornecedor!: ProdutoFornecedorComponent;

  constructor(private configService: ConfigService, private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.alimentaComboSituacao();
    this.alimentaMock();
  }

  pesquisar() {
    this.fornecedorService.buscaListaFornecedores(this.inputFiltros).subscribe((response) => {
      this.fornecedores = response ? response : []
    })
  }

  limpar() {
    this.fornecedores = [];
    this.inputFiltros = [];
  }


  alimentaComboSituacao() {
    this.listaCombos['situacao'] = Object.entries(SituacaoFornecedor).map(([chave, descricao]) => ({
      chave,
      descricao
    })).sort((a, b) => a.descricao.localeCompare(b.descricao));

    this.listaConfigCombos['situacao'] = this.configService.setConfigDropDownSetting(false, 'chave', 'descricao');
  }


  openModalNovoFornecedor() {
    this.modalNovoFornecedor.openModal()
      .then((res: any) => {
        this.pesquisar();
      })
      .catch((err: any) => {

      });
  }

  openModalHistorico(item: any) {
    this.modalHistoricoFornecedor.openModal(item)
      .then((res: any) => {
        this.pesquisar();
      })
      .catch((err: any) => {

      });
  }

  openModalProdutoFornecedor(item: any) {
    this.modalProdutoFornecedor.openModal(item)
      .then((res: any) => {
        this.pesquisar();
      })
      .catch((err: any) => {

      });
  }

  alimentaMock() {
    this.fornecedores = [{
      id: 1, pessoa: { id: 1, nome: 'fornecedor 1' }
    },
    {
      id: 2, pessoa: { id: 2, nome: 'fornecedor 2' }
    }]
  }

}
