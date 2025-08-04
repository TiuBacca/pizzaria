import { Component, OnInit, ViewChild } from '@angular/core';
import { Produto } from '../objetos/Produto';
import { SetorProduto, SetorProdutoHelper } from '../objetos/SetorProduto';
import { HistoricoComprasComponent } from './modais/historico-compras/historico-compras.component';
import { NovoProdutoComponent } from './modais/novo-produto/novo-produto.component';
import { ConfigService } from 'src/app/services/config.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  @ViewChild("modalNovoProduto")
  modalNovoProduto!: NovoProdutoComponent;

  @ViewChild("modalHistoricoCompras")
  modalHistoricoCompras!: HistoricoComprasComponent;

  paginaGridInicial: number = 1;

  inputFiltros: { [key: string]: any } = {};
  listaCombos: { [key: string]: any } = {};
  listaConfigCombos: { [key: string]: any } = {};
  produtos: any;


  constructor(private configService: ConfigService, private produtoService: ProdutoService, private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.produtos = this.alimentaMock();
    this.alimentaCombo();
  }

  pesquisar() {
    this.produtoService.buscaListaProdutos(this.inputFiltros).subscribe((response) => {
      this.produtos = response ? response : [];
    })
  }

  limpar() {
    this.inputFiltros = [];
    this.produtos = [];
    this.paginaGridInicial = 1;
  }

  alimentaCombo() {
    this.listaConfigCombos['setor'] = SetorProdutoHelper.config(this.configService)
    this.listaCombos['setor'] = SetorProdutoHelper.listar();

    this.listaConfigCombos['fornecedor'] = this.configService.setConfigDropDownSetting(false, 'id', 'nome');
    this.fornecedorService.buscaListaFornecedores({}).subscribe((respose) => {
      this.listaCombos['fornecedor'] = respose ? respose : [];
    })
  }

  openModalNovoProduto() {

    this.modalNovoProduto.openModal(null)
      .then((res: any) => {
        this.pesquisar();
      })
      .catch((err: any) => {

      });
  }

  editarProduto(item: any) {
    this.modalNovoProduto.openModal(item)
      .then((res: any) => {
        this.pesquisar();
      })
      .catch((err: any) => {

      });
  }


  openModalHistoricoCompras(item: any) {
    this.modalHistoricoCompras.openModal(item);
  }



  alimentaMock() {
    return [{ id: 1, descricao: 'teste', qtdEstoque: 5, setor: {chave:"COZINHA", descricao: SetorProduto.COZINHA}, precoUnit: 5 }]
  }

}


