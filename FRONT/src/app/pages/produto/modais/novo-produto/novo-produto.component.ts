import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Fornecedor } from 'src/app/pages/objetos/Fornecedor';
import { AlertService } from 'src/app/services/alert.service';
import { ConfigService } from 'src/app/services/config.service';
import { ProdutoService } from 'src/app/services/produto.service';

declare var window: any;

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  incluirForm = new FormGroup({
    id: new FormControl(0),
    descricao: new FormControl(""),
  })

  modalNovoProduto: any;

  constructor(private alertService: AlertService,  private produtoService: ProdutoService) { }

  ngOnInit(): void {
  }


  openModal(data: any) {

    return new Promise<any>((resolve, reject) => {
      this.iniciaModal();
      this.modalNovoProduto.show();

      this.onOk.subscribe((res) => {
        this.modalNovoProduto.hide();
        resolve(res);
      });
      this.onCancel.subscribe(() => {
        this.modalNovoProduto.hide();
        reject();
      });

    });
  }


  iniciaModal() {
    this.modalNovoProduto = new window.bootstrap.Modal(document.getElementById('modalNovoProduto'))
  }


  salvar() {
    // this.produtoService.salvarProduto(this.incluirForm.getRawValue()).subscribe((response) => {
    //   if (response) {
    //     this.alertService.showSucessMessage(response);
        this.onOk.emit();
    //   }
    // })
  }
}
