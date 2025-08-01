import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SituacaoFornecedor } from 'src/app/pages/objetos/SituacaoFornecedor';
import { ConfigService } from 'src/app/services/config.service';

declare var window: any;

@Component({
  selector: 'app-novo-fornecedor',
  templateUrl: './novo-fornecedor.component.html',
  styleUrls: ['./novo-fornecedor.component.css']
})
export class NovoFornecedorComponent implements OnInit {

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  modalNovoFornecedor: any;

  incluirForm = new FormGroup({
    id: new FormControl(0),
    nome: new FormControl(""),
    cnpj: new FormControl(""),
    situacao: new FormControl(SituacaoFornecedor)
  })

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
  }

  iniciaModal() {
    this.modalNovoFornecedor = new window.bootstrap.Modal(document.getElementById('modalNovoFornecedor'))
  }

  openModal() {
    return new Promise<any>((resolve, reject) => {
      this.iniciaModal();
      this.modalNovoFornecedor.show();

      this.onOk.subscribe((res) => {
        this.modalNovoFornecedor.hide();
        resolve(res);
      });
      this.onCancel.subscribe(() => {
        this.modalNovoFornecedor.hide();
        reject();
      });

    });

  }

  salvar(){
    this.onOk.emit();
  }

}
