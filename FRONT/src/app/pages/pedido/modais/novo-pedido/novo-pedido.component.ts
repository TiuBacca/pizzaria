import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TamanhoPizzaHelper } from 'src/app/pages/objetos/TamanhoPizza';
import { TipoMassaPizzaHelper } from 'src/app/pages/objetos/TipoMassaPizza';
import { ConfigService } from 'src/app/services/config.service';

declare var window: any;

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.css']
})
export class NovoPedidoComponent implements OnInit {

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  modalNovoPedido: any;

  incluirForm = new FormGroup({
    cliente: new FormControl({}, Validators.required),
    massa: new FormControl({}, Validators.required),
    tamanho: new FormControl({}, Validators.required),
  })

  listaCombos: { [key: string]: any } = {};
  listaConfig: { [key: string]: any } = {};

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
  }

  openModal(item: any) {

    return new Promise<any>((resolve, reject) => {
      this.iniciaModal();
      
      this.alimentaComboTipoMassa();
      this.alimentaComboTamanho();

      this.incluirForm.reset();
      this.modalNovoPedido.show();

      this.onOk.subscribe((res) => {
        this.modalNovoPedido.hide();
        resolve(res);
      });
      this.onCancel.subscribe(() => {
        this.modalNovoPedido.hide();
        reject();
      });

    });


  }

  alimentaComboTipoMassa() {
    this.listaCombos['massa'] = TipoMassaPizzaHelper.listar();
    this.listaConfig['massa'] = TipoMassaPizzaHelper.config(this.configService)
  }

  alimentaComboTamanho() {
    this.listaCombos['tamanho'] = TamanhoPizzaHelper.listar();
    this.listaConfig['tamanho'] = TamanhoPizzaHelper.config(this.configService)
  }

  iniciaModal() {
    this.modalNovoPedido = new window.bootstrap.Modal(document.getElementById('modalNovoPedido'))
  }
}
