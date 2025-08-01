import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    setConfigDropDownSetting(singleSelection: boolean, idField: string, textField: string): {} {
        return {
            singleSelection: singleSelection,
            idField: idField,
            textField: textField,
            closeDropDownOnSelection: true,
            allowSearchFilter: true,
            selectAllText: 'Selecionar todos',
            unSelectAllText: 'Desmarcar todos',
            itemsShowLimit: 1,
            searchPlaceholderText: 'Pesquisar',
            noDataAvailablePlaceholderText: 'Nenhum registro encontrado'
        };
    }

}