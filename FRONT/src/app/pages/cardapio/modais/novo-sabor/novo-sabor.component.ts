import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GrupoSaborPizzaHelper } from 'src/app/pages/objetos/GrupoSaborPizza';
import { ConfigService } from 'src/app/services/config.service';

declare var window: any;

@Component({
  selector: 'app-novo-sabor',
  templateUrl: './novo-sabor.component.html',
  styleUrls: ['./novo-sabor.component.css']
})
export class NovoSaborComponent implements OnInit {

  listaCombos: { [key: string]: any } = {};
  listaConfig: { [key: string]: any } = {};

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  modalNovoSabor: any;

  incluirForm = new FormGroup({
    id: new FormControl(),
    descricao: new FormControl("", Validators.required),
    grupo: new FormControl({}, Validators.required),
  })
  
  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
  }

  iniciaModal() {
    this.modalNovoSabor = new window.bootstrap.Modal(document.getElementById('modalNovoSabor'))
  }
  openModal(item: any) {

    return new Promise<any>((resolve, reject) => {
      this.iniciaModal();

      this.alimentaComboGrupo();

      this.incluirForm.reset();
      this.modalNovoSabor.show();

      this.onOk.subscribe((res) => {
        this.modalNovoSabor.hide();
        resolve(res);
      });
      this.onCancel.subscribe(() => {
        this.modalNovoSabor.hide();
        reject();
      });

    });


  }

    alimentaComboGrupo() {
      this.listaCombos['grupo'] = GrupoSaborPizzaHelper.listar();
      this.listaConfig['grupo'] = GrupoSaborPizzaHelper.config(this.configService)
    }
}
