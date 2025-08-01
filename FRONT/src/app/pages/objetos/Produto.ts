import { SetorProduto } from "./SetorProduto";

export class Produto {
    id?: number;
    descricao?: string;
    qtdEstoque?: number;
    setor?: SetorProduto;
    precoUnit?: number;

    constructor(init?: Partial<Produto>) {
        Object.assign(this, init);
    }
}

