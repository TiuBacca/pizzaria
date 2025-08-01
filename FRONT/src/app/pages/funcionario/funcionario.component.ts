import { Component, OnInit, ViewChild } from '@angular/core';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { NovoFuncionarioComponent } from './modais/novo-funcionario/novo-funcionario.component';

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


  @ViewChild("modalNovoFuncionario")
  modalNovoFuncionario!: NovoFuncionarioComponent;


  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.funcionarios = [{
      id: 1,
      nome: 'teste'
    }
    ]
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
    this.modalNovoFuncionario.openModal({})
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
}
