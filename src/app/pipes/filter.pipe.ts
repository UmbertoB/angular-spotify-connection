import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], term: string, field: string): any {
        return term 
            ? items.filter(item => item[field].toLowerCase().indexOf(term.toLowerCase()) !== -1)
            : items;
    }
}