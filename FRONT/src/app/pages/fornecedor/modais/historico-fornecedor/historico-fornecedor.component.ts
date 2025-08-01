import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';

declare var window: any;

@Component({
  selector: 'app-historico-fornecedor',
  templateUrl: './historico-fornecedor.component.html',
  styleUrls: ['./historico-fornecedor.component.css']
})
export class HistoricoFornecedorComponent implements OnInit {

  paginaHistorico = 1;
  historicoFornecedor: any;

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  modalHistoricoFornecedor: any;
  fornecedor: any;

  constructor(private fornecedorService: FornecedorService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.historicoFornecedor = [{ data: '01/02/2025', produto: { id: 1, descricao: 'pastel', valor: 4.34 }, qtd: 70 },
      { data: '07/02/2025', produto: { id: 2, descricao: 'churros', valor: 8.74 }, qtd: 5 }
    ]

  }

  iniciaModal() {
    this.modalHistoricoFornecedor = new window.bootstrap.Modal(document.getElementById('modalHistoricoFornecedor'))
  }

  openModal(item: any) {
    return new Promise<any>((resolve, reject) => {
      this.fornecedor = item;

      this.iniciaModal();
      this.alimentaModal();
      this.getValorTotalHistorico();
      this.modalHistoricoFornecedor.show();


      this.onOk.subscribe((res) => {
        this.modalHistoricoFornecedor.hide();
        resolve(res);
      });
      this.onCancel.subscribe(() => {
        this.modalHistoricoFornecedor.hide();
        reject();
      });

    });

  }

alimentaModal(){
  this.fornecedorService.buscarHistoricoPedisoPorFornecedor(this.fornecedor).subscribe((response) => {
    this.historicoFornecedor = response ? response : []
  })
}

getValorTotalHistorico() {
  const totalPorProduto = this.historicoFornecedor
    .map(item => ({
      descricao: item.produto?.descricao,
      valorTotal: (item.produto?.valor || 0) * (item.qtd || 0)
    }));

  const somaTotal = totalPorProduto
    .reduce((acc, curr) => acc + curr.valorTotal, 0);

  return somaTotal;
}
}
