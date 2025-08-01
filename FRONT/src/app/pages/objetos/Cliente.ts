import { SituacaoCliente } from "./SituacaoCliente";

export class Cliente {
  id?: number;
  nome?: string;
  situacao?: SituacaoCliente;
  ultimoPedido?: PedidoCliente;

  constructor(init?: Partial<Cliente>) {
    Object.assign(this, init);
  }
}

interface PedidoCliente {
  id: number,
  data: string
}