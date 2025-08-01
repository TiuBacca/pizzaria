import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FuncaoFuncionario } from 'src/app/pages/objetos/FuncaoFuncionario';
import { AlertService } from 'src/app/services/alert.service';
import { ConfigService } from 'src/app/services/config.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';

declare var window: any;

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./novo-funcionario.component.css']
})
export class NovoFuncionarioComponent implements OnInit {

  modalNovoFuncionario: any;

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  incluirForm = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', Validators.required),
    funcao: new FormControl(null, Validators.required)
  });

  listaCombos: { [key: string]: any } = {};
  listaConfig: { [key: string]: any } = {};

  constructor(private configService: ConfigService, private funcionarioService: FuncionarioService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }


  openModal(item: any) {


    return new Promise<any>((resolve, reject) => {
      this.iniciaModal();
      this.alimentaCombFuncao();

      if (item) {
        setTimeout(() => this.preencheModal(item)); // garante que o select já renderizou
      }

      this.modalNovoFuncionario.show();

      this.onOk.subscribe((res) => {
        this.modalNovoFuncionario.hide();
        resolve(res);
      });
      this.onCancel.subscribe(() => {
        this.modalNovoFuncionario.hide();
        reject();
      });

    });

  }


  alimentaCombFuncao() {
    this.listaCombos['funcao'] = Object.entries(FuncaoFuncionario).map(([chave, descricao]) => ({
      chave,
      descricao
    })).sort((a, b) => a.descricao.localeCompare(b.descricao));

    this.listaConfig['funcao'] = this.configService.setConfigDropDownSetting(false, 'chave', 'descricao');
  }

  iniciaModal() {
    this.modalNovoFuncionario = new window.bootstrap.Modal(document.getElementById('modalNovoFuncionario'))
  }

  preencheModal(item: any) {
    this.incluirForm.get('id')?.setValue(item.id);
  }

  salvar() {
    // this.funcionarioService.salvarFuncionario(this.incluirForm.getRawValue()).subscribe((response) => {
    //   if (response) {
    //     this.alertService.showSucessMessage(response);
        this.onOk.emit();
    //   }
    // })
  }
}
