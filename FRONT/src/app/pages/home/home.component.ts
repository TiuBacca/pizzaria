import { Component, OnInit, SimpleChanges } from '@angular/core';
import { getIconByItem } from 'src/app/config/icone-itens';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  abrirListaVendas = false;
  abrirListaPedidos = false;

  ultimosPedidos: any;
  listaPedidos: any;

  listaVendas: any;
  selectedItem: any = null;

  alimentaIconeItemPedido = getIconByItem;

  constructor(private cdr: ChangeDetectorRef) {
  }



  ngOnInit(): void {
    this.mockvendas();
    this.alimentaListaVendas();
    this.cdr.detectChanges();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ultimosPedidos'] && this.ultimosPedidos?.length) {
      this.alimentaListaVendas();
    }
  }

  alimentaListaVendas() {
    const itens = this.ultimosPedidos
      .filter(pedido => pedido.pedido?.length > 0)
      .flatMap(pedido => pedido.pedido || []);

    const agrupado = new Map<number, {
      item: number;
      descricao: string;
      quantidade: number;
      valorTotal: number;
    }>();

    itens.forEach(produto => {
      if (agrupado.has(produto.item)) {
        const existente = agrupado.get(produto.item)!;
        existente.quantidade += produto.quantidade;
        existente.valorTotal += produto.quantidade * produto.valorUnitario;
      } else {
        agrupado.set(produto.item, {
          item: produto.item,
          descricao: produto.descricao,
          quantidade: produto.quantidade,
          valorTotal: produto.quantidade * produto.valorUnitario
        });
      }
    });

    this.listaVendas = Array.from(agrupado.values());
  }


  getClasseFaixa(situacao: string): string {
    switch (situacao) {
      case 'PENDENTE': return 'bg-pendente';
      case 'FINALIZADO': return 'bg-finalizado';
      case 'CANCELADO': return 'bg-cancelado';
      default: return 'bg-default';
    }
  }

  getTotalPedidosBySituacao(situacao: string) {
    const itens = this.ultimosPedidos
      .filter(pedido => pedido.situacao === situacao);
    return itens.length;
  }

  onSelectItem(item: any) {
    this.selectedItem = item;
  }

  fecharAuxiliar() {
    this.selectedItem = null
  }


  getValorTotalPedido(pedido?: any[]): number {
    return pedido?.reduce((total, item) => total + (item.quantidade * item.valorUnitario), 0) ?? 0;
  }

  exibirTotalVendas() {
    this.alimentaListaVendas();
    this.abrirListaVendas = true;
    this.abrirListaPedidos = false;
  }

  exibirTotalPedidos() {
    this.abrirListaVendas = false;
    this.abrirListaPedidos = true;
  }

  fecharListaVendas() {
    this.abrirListaVendas = false;
  }

  fecharListaPedidos() {
    this.abrirListaPedidos = false;
  }

  getTotalVendas() {
    return this.listaVendas.reduce((total, venda) => total + venda.valorTotal, 0);
  }

  getTotalPedidos() {
    return this.listaPedidos.length;
  }


  mockvendas() {
    this.ultimosPedidos = [{
      data: '2025-01-01',
      situacao: 'PENDENTE',
      cliente: { id: 0, nome: 'nome' },
      endereco: 'rua 1 avenida tal 56 rua 1 avenida tal 56rua 1 avenida tal 56rua 1 avenida tal 56rua 1 avenida tal 56rua 1 avenida tal 56rua 1 avenida tal 56',
      numero: 1
    },
    {
      data: '2025-01-01',
      situacao: 'PENDENTE',
      cliente: { id: 0, nome: 'nome' },
      endereco: 'rua 1 avenida tal 56', numero: 1,
      pedido: [
        { item: 1, descricao: 'hamburger', observacao: 'bem passado bem passadobem passadobem passadobem passadobem passado', quantidade: 1, valorUnitario: 15.00 },
        { item: 2, descricao: 'batata', observacao: '', quantidade: 2, valorUnitario: 8.00 },
        { item: 3, descricao: 'refri', observacao: 'coca', quantidade: 1, valorUnitario: 5.50 },
        { item: 4, descricao: 'refri', observacao: 'fanta', quantidade: 1, valorUnitario: 5.50 }
      ]
    }, {
      data: '2025-01-01',
      situacao: 'PENDENTE',
      cliente: { id: 0, nome: 'nome' },
      endereco: 'rua 1 avenida tal 56', numero: 1,
      pedido: [
        { item: 1, descricao: 'hamburger', observacao: 'bem passado bem passadobem passadobem passadobem passadobem passado', quantidade: 1, valorUnitario: 15.00 },
        { item: 2, descricao: 'batata', observacao: '', quantidade: 2, valorUnitario: 8.00 }
      ]
    }, {
      data: '2025-01-01',
      situacao: 'CANCELADO',
      cliente: { id: 0, nome: 'nome' },
      endereco: 'rua 1 avenida tal 56', numero: 1
    }, {
      data: '2025-01-01',
      situacao: 'CANCELADO',
      cliente: { id: 0, nome: 'nome' },
      endereco: 'rua 1 avenida tal 56', numero: 1
    }, {
      data: '2025-01-01',
      situacao: 'CANCELADO',
      cliente: { id: 0, nome: 'nome' },
      endereco: 'rua 1 avenida tal 56', numero: 1
    }, {
      data: '2025-01-01',
      situacao: 'CANCELADO',
      cliente: { id: 0, nome: 'nome' },
      endereco: 'rua 1 avenida tal 56', numero: 1
    }, {
      data: '2025-01-01',
      situacao: 'CANCELADO',
      cliente: { id: 0, nome: 'nome' },
      endereco: 'rua 1 avenida tal 56', numero: 1
    }, {
      data: '2025-01-01',
      situacao: 'CANCELADO',
      cliente: { id: 0, nome: 'nome' },
      endereco: 'rua 1 avenida tal 56', numero: 1
    }, {
      data: '2025-01-01',
      situacao: 'CANCELADO',
      cliente: { id: 0, nome: 'nome' },
      endereco: 'rua 1 avenida tal 56', numero: 1
    }, {
      data: '2025-01-01',
      situacao: 'CANCELADO',
      cliente: { id: 0, nome: 'nome' },
      endereco: 'rua 1 avenida tal 56', numero: 1
    }, {
      data: '2025-01-01',
      situacao: 'CANCELADO',
      cliente: { id: 0, nome: 'nome' },
      endereco: 'rua 1 avenida tal 56', numero: 1
    }]
    this.listaPedidos = this.ultimosPedidos;
  }

  animarCarrinho() {
    const botao = document.querySelector('.botao-novo-pedido');
    botao?.classList.add('carrinho-animado');

    setTimeout(() => {
      botao?.classList.remove('carrinho-animado');
      // aqui você pode chamar a função que realmente cria o pedido
    }, 1000); // tempo da animação
  }

}
