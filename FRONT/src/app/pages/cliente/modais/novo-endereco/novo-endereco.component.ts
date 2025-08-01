import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ConfigService } from 'src/app/services/config.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { IbgeService } from 'src/app/services/ibge.service';

declare var window: any;

@Component({
  selector: 'app-novo-endereco',
  templateUrl: './novo-endereco.component.html',
  styleUrls: ['./novo-endereco.component.css']
})
export class NovoEnderecoComponent implements OnInit {

  modalEndereco: any;

  formEndereco = new FormGroup({
    estado: new FormControl(),
    cidade: new FormControl(),
    rua: new FormControl(""),
    bairro: new FormControl(""),

    complemento: new FormControl(""),
    numero: new FormControl(""),
    cep: new FormControl(""),
  });


  listaCombos: { [key: string]: any } = {};
  listaConfigCombos: { [key: string]: any } = {};

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor(private configService: ConfigService, private ibgeService: IbgeService,
     private alertService: AlertService, private enderecoService: EnderecoService) { }

  ngOnInit(): void {
  }

  openModal(item: any) {

    return new Promise<any>((resolve, reject) => {
      this.iniciaModal();
      this.formEndereco.reset();
      this.modalEndereco.show();

      console.log(item)

      this.onOk.subscribe((res) => {
        this.modalEndereco.hide();
        resolve(res);
      });
      this.onCancel.subscribe(() => {
        this.modalEndereco.hide();
        reject();
      });

    });


  }

  salvarEndereco(){
    // this.enderecoService.salvarEndereco(this.formEndereco.getRawValue()).subscribe((response) => {
    //   if(response){
    //     this.alertService.showInfoMessage(response);
        this.onOk.emit();
    //   }
    // })
  }

  alimentaConfigCombos() {

    this.listaConfigCombos['configEstado'] = this.configService.setConfigDropDownSetting(
      true,
      'chave',
      'descricao'
    );

    this.listaConfigCombos['configCidade'] = this.configService.setConfigDropDownSetting(
      true,
      'chave',
      'descricao'
    );


  }

  alimentaComboEstado() {
    this.ibgeService.getEstados().subscribe(estados => {
      this.listaCombos['listaEstado'] = estados.map(e => ({
        chave: e.sigla,
        descricao: e.nome
      })).sort((a, b) => a.descricao.localeCompare(b.descricao));
    });
  }

  onEstadoSelecionado(event: any) {
    this.ibgeService.getCidadesPorEstado(event.chave).subscribe(cidades => {
      this.listaCombos['listaCidade'] = cidades.map(c => ({
        chave: c.id,
        descricao: c.nome
      })).sort((a, b) => a.descricao.localeCompare(b.descricao));
    });
  }


  buscarEnderecoPorCep() {
    const cep = this.formEndereco.get('cep')?.value?.replace(/\D/g, '');

    if (cep && cep.length === 8) {
      this.ibgeService.getEnderecoPorCep(cep).subscribe(endereco => {
        if (endereco.erro) {
          this.alertService.showInfoMessage('CEP não encontrado ou inválido.');
        } else {
          this.formEndereco.patchValue({
            rua: endereco.logradouro,
            bairro: endereco.bairro,
          });

          const estadoSelecionado = this.listaCombos['listaEstado'].find(e => e.chave === endereco.uf);
          if (estadoSelecionado) {
            this.formEndereco.get('estado')?.setValue([estadoSelecionado]);
            this.ibgeService.getCidadesPorEstado(estadoSelecionado.chave).subscribe(cidades => {
              this.listaCombos['listaCidade'] = cidades.map(c => ({
                chave: c.id,
                descricao: c.nome
              }));

              const cidadeSelecionada = this.listaCombos['listaCidade'].find(c => c.descricao.toLowerCase() === endereco.localidade.toLowerCase());
              if (cidadeSelecionada) {
                this.formEndereco.get('cidade')?.setValue([cidadeSelecionada]);
              }
            });
          }
        }

      }, error => {
        this.alertService.showInfoMessage('CEP não encontrado ou inválido.');
      });
    }
  }

  iniciaModal() {
    this.modalEndereco = new window.bootstrap.Modal(document.getElementById('modalEndereco'));
    this.alimentaConfigCombos();
    this.alimentaComboEstado();
  }
}
