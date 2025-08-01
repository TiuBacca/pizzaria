import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Contato } from 'src/app/pages/objetos/Contato';
import { TipoContato } from 'src/app/pages/objetos/TipoContato';
import { ContatoService } from 'src/app/services/contato.service';

declare var window: any;

@Component({
  selector: 'app-novo-contato',
  templateUrl: './novo-contato.component.html',
  styleUrls: ['./novo-contato.component.css']
})
export class NovoContatoComponent implements OnInit {

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  modalContato: any;

  incluirForm = new FormGroup({
    contato: new FormControl(''),
    tipo: new FormControl(Contato)
  })


  dropdownSettings = {
    singleSelection: true,
    idField: 'chave',
    textField: 'descricao',
    enableCheckAll: false,
    closeDropDownOnSelection: true,
    allowSearchFilter: false
  };

  listaCombos: { [key: string]: any } = {};
  constructor(private contatoService: ContatoService) { }

  ngOnInit(): void {
    this.listaCombos['tipo'] = Object.entries(TipoContato).map(([chave, descricao]) => ({
      chave,
      descricao
    }));
  }


  openModal(item: any) {

    return new Promise<any>((resolve, reject) => {
      this.iniciaModal();
      this.incluirForm.reset();
      this.modalContato.show();

      console.log(item)

      this.onOk.subscribe((res) => {
        this.modalContato.hide();
        resolve(res);
      });
      this.onCancel.subscribe(() => {
        this.modalContato.hide();
        reject();
      });

    });


  }

  iniciaModal() {
    this.modalContato = new window.bootstrap.Modal(document.getElementById('modalContato'))
  }

  
  salvarContato(){
    // this.contatoService.salvarContato(this.formEndereco.getRawValue()).subscribe((response) => {
    //   if(response){
    //     this.alertService.showInfoMessage(response);
        this.onOk.emit();
    //   }
    // })
  }
}
