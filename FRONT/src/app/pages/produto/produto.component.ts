import { Component, OnInit, ViewChild } from '@angular/core';
import { Produto } from '../objetos/Produto';
import { SetorProduto } from '../objetos/SetorProduto';
import { HistoricoComprasComponent } from './modais/historico-compras/historico-compras.component';
import { NovoProdutoComponent } from './modais/novo-produto/novo-produto.component';
import { ConfigService } from 'src/app/services/config.service';
import { ProdutoService } from 'src/app/services/produto.service';

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
  produtos: Produto[] = [];


  constructor(private configService: ConfigService, private produtoService: ProdutoService) { }

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
    this.listaConfigCombos['setor'] = this.configService.setConfigDropDownSetting(false, 'chave', 'descricao');

    this.listaCombos['setor'] = Object.entries(SetorProduto).map(([chave, descricao]) => ({
      chave,
      descricao
    })).sort((a, b) => a.descricao.localeCompare(b.descricao));
  }

  openModalNovoProduto() {

    this.modalNovoProduto.openModal(null)
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
    return [{ id: 1, descricao: 'teste', qtdEstoque: 5, setor: SetorProduto.COZINHA, precoUnit: 5 }]
  }

}


