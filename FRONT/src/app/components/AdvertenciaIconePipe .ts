import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'advertenciaIcone'
})
export class AdvertenciaIconePipe implements PipeTransform {
    transform(qtd: number): { icon: string, color: string, title: string } {
        switch (true) {   // <-- aqui é sempre true, pra comparar cases booleanos
            case qtd === 0 || qtd == null:
                return {
                    icon: 'bi bi-check-circle-fill',
                    color: 'text-success',
                    title: 'Sem advertências'
                };

            case qtd === 1:
                return {
                    icon: 'bi bi-exclamation-triangle-fill',
                    color: 'text-warning',
                    title: `Advertências (${qtd})`
                };

            case qtd > 1 && qtd < 5:
                return {
                    icon: 'bi bi-exclamation-triangle-fill',
                    color: 'text-warning',
                    title: `Advertências (${qtd})`
                };

            default:
                return {
                    icon: 'bi bi-x-octagon-fill',
                    color: 'text-danger',
                    title: `Advertências (${qtd})`
                };
        }
    }


}
