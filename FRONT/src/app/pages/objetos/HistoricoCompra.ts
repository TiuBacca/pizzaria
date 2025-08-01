import { Fornecedor } from "./Fornecedor";
import { Funcionario } from "./Funcionario";

export class HistoricoCompra {
  id?: number;
  data?: Date;
  valor?: number;
  comprador?: Funcionario;
  fornecedor?: Fornecedor;

  constructor(init?: Partial<HistoricoCompra>) {
    Object.assign(this, init);
  }
}
