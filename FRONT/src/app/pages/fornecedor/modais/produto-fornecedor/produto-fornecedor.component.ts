import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SetorProduto } from 'src/app/pages/objetos/SetorProduto';
import { AlertService } from 'src/app/services/alert.service';
import { NovoProdutoFornecedorComponent } from '../novo-produto-fornecedor/novo-produto-fornecedor.component';
import Swal from 'sweetalert2';
import { FornecedorService } from 'src/app/services/fornecedor.service';

declare var window: any;

@Component({
  selector: 'app-produto-fornecedor',
  templateUrl: './produto-fornecedor.component.html',
  styleUrls: ['./produto-fornecedor.component.css']
})
export class ProdutoFornecedorComponent implements OnInit {

  @ViewChild("modalNovoProdutoFornecedor")
  modalNovoProdutoFornecedor!: NovoProdutoFornecedorComponent;

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  paginaProdutoFornecedor = 1;
  modalProdutoFornecedor: any;
  fornecedor: any;

  produtos: any;

  listaCombos: { [key: string]: any } = {};
  listaConfigCombos: { [key: string]: any } = {};

  constructor(private alertService: AlertService, private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.produtos = [
      { id: 1, descricao: 'banana', setor: SetorProduto.COZINHA, valor: 0.85 },
      { id: 2, descricao: 'maça', setor: SetorProduto.COZINHA, valor: 1.20 },
      { id: 3, descricao: 'papel', setor: SetorProduto.LIMPEZA, valor: 3.75 }
    ]
  }


  openModalNovoProdutoFornecedor() {
    this.modalNovoProdutoFornecedor.openModal(this.fornecedor)
      .then((res: any) => {
      })
      .catch((err: any) => {

      });
  }
  

  iniciaModal() {
    this.modalProdutoFornecedor = new window.bootstrap.Modal(document.getElementById('modalProdutoFornecedor'))
  }

  openModal(item: any) {
    return new Promise<any>((resolve, reject) => {
      this.fornecedor = item;

      this.iniciaModal();
      this.pesquisa();
      this.modalProdutoFornecedor.show();


      this.onOk.subscribe((res) => {
        this.modalProdutoFornecedor.hide();
        resolve(res);
      });
      this.onCancel.subscribe(() => {
        this.modalProdutoFornecedor.hide();
        reject();
      });

    });

  }

  async excluirProduto(data: any) {
    const confirmado = await this.alertService.confirmarAcao('Você realmente deseja excluir este produto?');

    if (confirmado) {
      this.fornecedorService.excluirProduto(data).subscribe((response) => {
        if (response) {
          this.alertService.showSucessMessage(response);
          this.pesquisa();
        }
      })
    }
  }

  pesquisa() {
    this.fornecedorService.buscarListaProdutosPorFornecedor(this.fornecedor).subscribe((response) => {
      this.produtos = response ? response : [];
    })
  }

  async fazerPedidoProduto(item: any) {
    const qtdString = await this.confirmarAcaoComCampoObrigatorio("Quantas unidades a serem pedidas?");

    if (qtdString !== false) {
      const qtd = parseInt(qtdString, 10);

      if (!isNaN(qtd) && qtd > 0) {
        var pedido = {
          idFornecedor: this.fornecedor.id,
          quantidade: qtd,
          idProduto: item.id
        }

        this.fornecedorService.gerarPedido(pedido).subscribe((response) => {
          if (response) {
            this.alertService.showSucessMessage(response);
          }
        })
      } else {
        Swal.fire('Erro', 'Quantidade inválida!', 'error');
      }

    }
  }

  async confirmarAcaoComCampoObrigatorio(mensagem: string): Promise<string | false> {
    const { value, isConfirmed } = await Swal.fire({
      title: mensagem,
      input: 'number',
      inputPlaceholder: 'Digite a quantidade',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#008127ff',
      inputValidator: (value) => {
        if (!value || parseInt(value, 10) <= 0) {
          return 'Informe uma quantidade válida';
        }
        return null;
      }
    });

    return isConfirmed ? value : false;
  }


  alterarProduto(item: any) {

    var data = {
      ...item, 
      editar: true
    }
    this.modalNovoProdutoFornecedor.openModal(data)
      .then((res: any) => {
      })
      .catch((err: any) => {

      });
  }

}
