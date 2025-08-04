import { ConfigService } from "src/app/services/config.service";

export enum GrupoSaborPizza {
  TRADICIONAL = 'Tradicional',       // Sabores clássicos, como Mussarela e Calabresa
  ESPECIAL = 'Especial',             // Sabores mais elaborados
  PREMIUM = 'Premium',               // Ingredientes diferenciados
  DOCE = 'Doce',                     // Sabores doces como chocolate, banana
  VEGANA = 'Vegana',                 // Sabores sem ingredientes de origem animal
}

export const GrupoSaborPizzaDetalhes: Record<GrupoSaborPizza, { descricao: string }> = {
  [GrupoSaborPizza.TRADICIONAL]: { descricao: 'Sabores clássicos que agradam todos os paladares' },
  [GrupoSaborPizza.ESPECIAL]: { descricao: 'Sabores mais elaborados e diferenciados' },
  [GrupoSaborPizza.PREMIUM]: { descricao: 'Ingredientes premium e receitas exclusivas' },
  [GrupoSaborPizza.DOCE]: { descricao: 'Opções doces para a sobremesa' },
  [GrupoSaborPizza.VEGANA]: { descricao: 'Feita sem ingredientes de origem animal' },
};

export class GrupoSaborPizzaHelper {
  static listar(): { chave: keyof typeof GrupoSaborPizza; descricao: string }[] {
    return Object.entries(GrupoSaborPizza)
      .map(([chave, descricao]) => ({
        chave: chave as keyof typeof GrupoSaborPizza,
        descricao
      }))
      .sort((a, b) => a.descricao.localeCompare(b.descricao));
  }

  static config(configService: ConfigService) {
    return configService.setConfigDropDownSetting(true, 'chave', 'descricao');
  }
}
