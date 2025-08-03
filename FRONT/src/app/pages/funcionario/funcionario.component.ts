import { Component, OnInit, ViewChild } from '@angular/core';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { NovoFuncionarioComponent } from './modais/novo-funcionario/novo-funcionario.component';
import { FuncaoFuncionario } from '../objetos/FuncaoFuncionario';
import { AlertService } from 'src/app/services/alert.service';
import { SituacaoFuncionario } from '../objetos/SituacaoFuncionario';
import { FeriasFuncionarioComponent } from './modais/ferias-funcionario/ferias-funcionario.component';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  inputFiltros: { [key: string]: any } = {};
  listaCombos: { [key: string]: any } = {};
  listaConfigCombos: { [key: string]: any } = {};

  paginaGridInicial: number = 1;

  funcionarios: any;
  @ViewChild("modalFerias")
  modalFerias!: FeriasFuncionarioComponent;

  @ViewChild("modalNovoFuncionario")
  modalNovoFuncionario!: NovoFuncionarioComponent;


  constructor(private funcionarioService: FuncionarioService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.funcionarios = [{
      id: 1,
      nome: 'teste',
      advertencias: 0,
      situacao: {chave: "ATIVO", descricao: SituacaoFuncionario.ATIVO},
      funcoes: [
        { chave: "PIZZAIOLO", descricao: FuncaoFuncionario.PIZZAIOLO },
        { chave: "CAIXA", descricao: FuncaoFuncionario.CAIXA }
      ]
    },
    {
      id: 2,
      nome: 'adv 1',
      advertencias: 1,
            situacao: {chave: "ATIVO", descricao: SituacaoFuncionario.ATIVO},
      funcoes: [
        { chave: "PIZZAIOLO", descricao: FuncaoFuncionario.PIZZAIOLO },
        { chave: "CAIXA", descricao: FuncaoFuncionario.CAIXA }
      ]
    }
      ,
    {
      id: 3,
      nome: 'adv 2',
      advertencias: 2,
            situacao: {chave: "ATIVO", descricao: SituacaoFuncionario.ATIVO},
      funcoes: [
        { chave: "PIZZAIOLO", descricao: FuncaoFuncionario.PIZZAIOLO },
        { chave: "CAIXA", descricao: FuncaoFuncionario.CAIXA }
      ]
    },
    {
      id: 7,
      nome: 'adv 5',
      advertencias: 5,
      funcoes: [
        { chave: "PIZZAIOLO", descricao: FuncaoFuncionario.PIZZAIOLO },
        { chave: "CAIXA", descricao: FuncaoFuncionario.CAIXA }
      ]
    },
    {
      id: 4,
      nome: 'adv 6',
      advertencias: 6,
                 situacao: {chave: "DESLIGADO", descricao: SituacaoFuncionario.DESLIGADO},
 
      funcoes: [
        { chave: "PIZZAIOLO", descricao: FuncaoFuncionario.PIZZAIOLO },
        { chave: "CAIXA", descricao: FuncaoFuncionario.CAIXA }
      ]
    }

    ]
  }


  getFuncoesDescricao(funcoes: any[]): string {
    return funcoes?.map(f => f.descricao).join(', ') || '';
  }

  pesquisar() {
    this.funcionarioService.buscaListaFuncionarios(this.inputFiltros).subscribe((response) => {
      this.funcionarios = response ? response : []
    })
  }

  limpar() {
    this.inputFiltros = [];
    this.funcionarios = [];
  }


  openModalNovoFuncionario() {
    this.modalNovoFuncionario.openModal(null)
      .then((res: any) => {
        this.pesquisar();
      })
      .catch((err: any) => {

      });
  }

  openModalFerias(item: any) {
    this.modalFerias.openModal(item)
      .then((res: any) => {
        this.pesquisar();
      })
      .catch((err: any) => {

      });
  }

  openModalEdicaoFuncionario(item: any) {
    this.modalNovoFuncionario.openModal(item)
      .then((res: any) => {
        this.pesquisar();
      })
      .catch((err: any) => {

      });
  }

  async adicionarAdvertencia(item: any) {
    const confirmado = await this.alertService.confirmarAcaoDinamico(
      'Tem certeza que deseja adicionar uma advertencia a este funcionário?',
      '#7c7a02',
      'warning'  
    );

    if (confirmado) {
      this.funcionarioService.adicionarAdvertencia(item).subscribe((response) => {
        if (response) {
          this.alertService.showSucessMessage(response);
        }
      })
      this.pesquisar();
    }
  }

  async demitirFuncionario(item: any) {
    const confirmado = await this.alertService.confirmarAcaoDinamico(
      'Tem certeza que deseja demitir este funcionário?',
      '#7c0202c0',    
      'warning'
    );

    if (confirmado) {
      this.funcionarioService.demitirFuncionario(item).subscribe((response) => {
        if (response) {
          this.alertService.showSucessMessage(response);
        }
      })
      this.pesquisar();
    }
  }


}
