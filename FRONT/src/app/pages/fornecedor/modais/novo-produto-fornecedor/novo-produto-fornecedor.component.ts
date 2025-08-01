import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SetorProduto } from 'src/app/pages/objetos/SetorProduto';
import { AlertService } from 'src/app/services/alert.service';
import { ConfigService } from 'src/app/services/config.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';

declare var window: any;

@Component({
  selector: 'app-novo-produto-fornecedor',
  templateUrl: './novo-produto-fornecedor.component.html',
  styleUrls: ['./novo-produto-fornecedor.component.css']
})
export class NovoProdutoFornecedorComponent implements OnInit {

  modalNovoProdutoFornecedor: any;
  valorFormatado: string = '';

  incluirForm = new FormGroup({
    id: new FormControl(null),
    descricao: new FormControl('', Validators.required),
    valor: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    setor: new FormControl(null, Validators.required)
  });


  listaCombos: { [key: string]: any } = {};
  listaConfig: { [key: string]: any } = {};

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor(private configService: ConfigService, private fornecedorService: FornecedorService, private alertService: AlertService) { }


  ngOnInit(): void {
  }

  openModal(item: any) {
    return new Promise<any>((resolve, reject) => {

      this.iniciaModal();
      this.alimentaCombo();
      this.incluirForm.reset();
      this.valorFormatado = '0.00'

      if (item.editar) {
        setTimeout(() => this.alimentaModalEdicao(item)); // garante que o select já renderizou
      }
      this.modalNovoProdutoFornecedor.show();


      this.onOk.subscribe((res) => {
        this.modalNovoProdutoFornecedor.hide();
        resolve(res);
      });
      this.onCancel.subscribe(() => {
        this.modalNovoProdutoFornecedor.hide();
        reject();
      });

    });

  }

  alimentaModalEdicao(item: any) {
    this.incluirForm.get('id')?.setValue(item.id);
    this.incluirForm.get('descricao')?.setValue(item.descricao);
    this.incluirForm.get('valor')?.setValue(item.valor);

    this.valorFormatado = item.valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const setor = this.listaCombos['setor'].find(obj => obj.descricao === item.setor);
    if (setor) {
      this.incluirForm.get('setor')?.setValue([setor]);
    }
  }

  iniciaModal() {
    this.modalNovoProdutoFornecedor = new window.bootstrap.Modal(document.getElementById('modalNovoProdutoFornecedor'))
  }

  alimentaCombo() {
    this.listaConfig['setor'] = this.configService.setConfigDropDownSetting(true, 'chave', 'descricao');

    this.listaCombos['setor'] = Object.entries(SetorProduto).map(([chave, descricao]) => ({
      chave,
      descricao
    })).sort((a, b) => a.descricao.localeCompare(b.descricao));
  }

  salvarProduto() {
    // this.fornecedorService.salvarNovoProduto(this.incluirForm.getRawValue()).subscribe((response) => {
    //   if (response) {
    //     this.alertService.showSucessMessage(response);
    this.onOk.emit();
    //   }
    // })
  }


  formatarValor(event: Event) {
    const input = event.target as HTMLInputElement;
    const somenteNumeros = input.value.replace(/\D/g, '');

    const valorNumerico = parseFloat(somenteNumeros) / 100;

    this.valorFormatado = valorNumerico.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    this.incluirForm.get('valor')?.setValue(valorNumerico);

  }

  permitirSomenteNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }



}
