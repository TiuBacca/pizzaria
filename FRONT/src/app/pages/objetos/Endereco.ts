import { TipoEndereco } from "./TipoEndereco";

export class Endereco {
  rua?: string;
  bairro?: string;
  numero?: number;
  tipo? : TipoEndereco;
  cep?: string;

  constructor(init?: Partial<Endereco>) {
    Object.assign(this, init);
  }
}
