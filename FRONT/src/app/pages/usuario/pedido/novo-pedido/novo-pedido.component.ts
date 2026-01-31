import { Component, OnInit } from '@angular/core';
import { Sabor } from 'src/app/pages/objetos/Pizza';

declare var bootstrap: any;

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.css']
})
export class NovoPedidoComponent implements OnInit {

  modal!: any;

  tamanhos = [
    { nome: 'Pequena (4 fatias)', fatias: 4 },
    { nome: 'Média (6 fatias)', fatias: 6 },
    { nome: 'Grande (8 fatias)', fatias: 8 }
  ];

  sabores = [
    { nome: 'Calabresa', imagem: 'assets/img/sabores/calabresa.png' },
    { nome: 'Mussarela', imagem: 'assets/img/sabores/marguerita.png' },
    { nome: 'Frango', imagem: 'assets/img/sabores/frango.png' }  ];

  fatias: any[] = [];

  ngOnInit(): void {
    const el = document.getElementById('modalNovoPedido');
    this.modal = new bootstrap.Modal(el);
  }

  openModal() {
    this.modal.show();
  }

 selecionarTamanho(qtd: number) {
    this.fatias = Array.from({ length: qtd }, () => ({
      sabor: null
    }));
  }

  dragSabor(sabor: Sabor, event: DragEvent) {
    event.dataTransfer?.setData('sabor', JSON.stringify(sabor));
  }

  dropPizza(event: DragEvent) {
    event.preventDefault();

    const data = event.dataTransfer?.getData('sabor');
    if (!data || this.fatias.length === 0) return;

    const sabor: Sabor = JSON.parse(data);
    this.adicionarSabor(sabor);
  }

  adicionarSabor(sabor: Sabor) {
    for (let i = this.fatias.length - 1; i > 0; i--) {
      this.fatias[i].sabor = this.fatias[i - 1].sabor;
    }

    this.fatias[0].sabor = sabor;
  }
}
