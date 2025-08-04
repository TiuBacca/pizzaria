import { ConfigService } from "src/app/services/config.service";

export enum SetorProduto {
  COZINHA = 'Cozinha',
  LIMPEZA = 'Limpeza',
  MESAS = 'Mesas',
  ALMOCHARIFADO = 'Almocharifado',
  ENTREGA = 'Entrega'
}


export class SetorProdutoHelper {
  static listar(): { chave: keyof typeof SetorProduto; descricao: string }[] {
    return Object.entries(SetorProduto)
      .map(([chave, descricao]) => ({
        chave: chave as keyof typeof SetorProduto,
        descricao
      }))
      .sort((a, b) => a.descricao.localeCompare(b.descricao));
  }

  static config(configService: ConfigService) {
    return configService.setConfigDropDownSetting(true, 'chave', 'descricao');
  }
}