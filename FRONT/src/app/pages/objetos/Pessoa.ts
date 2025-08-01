export class Pessoa {
  id?: number;
  nome?: string;

  constructor(init?: Partial<Pessoa>) {
    Object.assign(this, init);
  }
}

