import { ConfigService } from "src/app/services/config.service";

export enum TipoMassaPizza {
  TRADICIONAL = 'Tradicional',   // Massa padrão da casa
  FINA = 'Fina',                 // Massa mais crocante
  GROSSA = 'Grossa',             // Massa mais espessa
  INTEGRAL = 'Integral',         // Massa feita com farinha integral
  SEM_GLUTEN = 'Sem Glúten',     // Opção para restrições alimentares
  ARTESANAL = 'Artesanal'        // Massa rústica feita à mão
}

export class TipoMassaPizzaHelper {
  static listar(): { chave: keyof typeof TipoMassaPizza; descricao: string }[] {
    return Object.entries(TipoMassaPizza)
      .map(([chave, descricao]) => ({
        chave: chave as keyof typeof TipoMassaPizza,
        descricao
      }))
      .sort((a, b) => a.descricao.localeCompare(b.descricao));
  }

  static config(configService: ConfigService) {
    return configService.setConfigDropDownSetting(true, 'chave', 'descricao');
  }
}