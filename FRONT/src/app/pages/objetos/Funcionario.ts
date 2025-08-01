import { Pessoa } from "./Pessoa";

export class Funcionario {
  id?: number;
  pessoa?: Pessoa;

  constructor(init?: Partial<Funcionario>) {
    Object.assign(this, init);
  }
}

