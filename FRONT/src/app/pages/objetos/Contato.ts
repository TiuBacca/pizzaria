import { TipoContato } from "./TipoContato";

export class Contato {

    contato?: string
    tipoContato? : TipoContato

  constructor(init?: Partial<Contato>) {
    Object.assign(this, init);
  }
}
