import { Pessoa } from "./Pessoa";
import { SituacaoFornecedor } from "./SituacaoFornecedor";

export class Fornecedor {
  id?: number;
  pessoa?: Pessoa;
  situacao?: SituacaoFornecedor

  constructor(init?: Partial<Fornecedor>) {
    Object.assign(this, init);
  }
}

