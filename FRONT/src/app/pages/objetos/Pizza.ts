export interface Sabor {
  nome: string;
  imagem: string;
}

export interface Fatia {
  sabor?: Sabor;
}
