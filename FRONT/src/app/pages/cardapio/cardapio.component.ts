import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CardapioService } from 'src/app/services/cardapio.service';
import { NovoSaborComponent } from './modais/novo-sabor/novo-sabor.component';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

  paginaGridInicial: number = 1;

  sabores: any;

  listaCombos: { [key: string]: any } = {};
  inputFiltros: { [key: string]: any } = {};
  listaConfigCombos: { [key: string]: any } = {};

  @ViewChild("modalNovoSabor")
  modalNovoSabor!: NovoSaborComponent;


  constructor(private alertService: AlertService, private cardapioService: CardapioService) { }

  ngOnInit(): void {
  }


  pesquisar() {
    this.cardapioService.buscaListaSabores(this.inputFiltros).subscribe((response) => {
      this.sabores = response ? response : [];
    })
  }

  limpar() {
    this.inputFiltros = [];
    this.paginaGridInicial = 1;
    this.sabores = [];
  }

  openModalNovoSabor() {
    console.log(44)
    this.modalNovoSabor.openModal({})
      .then((res: any) => {
        this.pesquisar();
      })
      .catch((err: any) => {

      });
  }
}
