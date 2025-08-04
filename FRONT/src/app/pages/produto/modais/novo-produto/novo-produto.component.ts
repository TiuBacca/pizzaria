import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Fornecedor } from 'src/app/pages/objetos/Fornecedor';
import { SetorProdutoHelper } from 'src/app/pages/objetos/SetorProduto';
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
    descricao: new FormControl("", Validators.required),
    setor: new FormControl({}, Validators.required)
  })


  listaCombos: { [key: string]: any } = {};
  listaConfig: { [key: string]: any } = {};

  modalNovoProduto: any;

  constructor(private alertService: AlertService, private produtoService: ProdutoService, private configService: ConfigService) { }

  ngOnInit(): void {
  }


  openModal(data: any) {

    return new Promise<any>((resolve, reject) => {
      this.iniciaModal();
      this.alimentaComboSetorProduto();
      if (data) {
        setTimeout(() => this.alimentaModalEdicao(data)); // garante que o select já renderizou
      }
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

  alimentaModalEdicao(item: any) {
    this.incluirForm.get('id')?.setValue(item.id);
    this.incluirForm.get('descricao')?.setValue(item.descricao);

    console.log(item)
    const setor = this.listaCombos['setor'].find(obj => obj.descricao === item.setor?.descricao);
    if (setor) {
      this.incluirForm.get('setor')?.setValue([setor]);
    }

  }

  iniciaModal() {
    this.modalNovoProduto = new window.bootstrap.Modal(document.getElementById('modalNovoProduto'))
  }

  alimentaComboSetorProduto() {
    this.listaCombos['setor'] = SetorProdutoHelper.listar();
    this.listaConfig['setor'] = SetorProdutoHelper.config(this.configService);
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
