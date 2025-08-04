import { ConfigService } from "src/app/services/config.service";

export enum TamanhoPizza {
  BROTINHO = 'Brotinho',         // Pequena (individual)
  MÉDIA = 'Média',               // Serve até 2 pessoas
  GRANDE = 'Grande',             // Serve até 4 pessoas
  FAMÍLIA = 'Família',           // Serve até 6 pessoas
  GIGANTE = 'Gigante',           // Extra grande para grupos
}

export const TamanhoPizzaDetalhes: Record<TamanhoPizza, { pessoas: number; descricao: string }> = {
  [TamanhoPizza.BROTINHO]: { pessoas: 1, descricao: 'Pequena (individual)' },
  [TamanhoPizza.MÉDIA]: { pessoas: 2, descricao: 'Serve até 2 pessoas' },
  [TamanhoPizza.GRANDE]: { pessoas: 4, descricao: 'Serve até 4 pessoas' },
  [TamanhoPizza.FAMÍLIA]: { pessoas: 6, descricao: 'Serve até 6 pessoas' },
  [TamanhoPizza.GIGANTE]: { pessoas: 8, descricao: 'Extra grande para grupos' }
};

export class TamanhoPizzaHelper {
  static listar(): { chave: keyof typeof TamanhoPizza; descricao: string }[] {
    return Object.entries(TamanhoPizza)
      .map(([chave, descricao]) => ({
        chave: chave as keyof typeof TamanhoPizza,
        descricao
      }))
      .sort((a, b) => a.descricao.localeCompare(b.descricao));
  }

  static config(configService: ConfigService) {
    return configService.setConfigDropDownSetting(true, 'chave', 'descricao');
  }
}
