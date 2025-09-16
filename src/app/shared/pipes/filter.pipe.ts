import { Injectable, Pipe, PipeTransform } from '@angular/core';

export function normalizeFilterValue(value: unknown): string {
    if (value === null || value === undefined) {
        return '';
    }

    return value
        .toString()
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');
}

@Pipe({
    name: 'filterBy',
    standalone: true,
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(array: any[], filter: string, property: string): any {
        if (!array || !filter) {
            return array;
        }

        const normalizedFilter = normalizeFilterValue(filter);
        
        return array.filter((item) =>
            normalizeFilterValue(item?.[property]).includes(normalizedFilter)
        );
    }
}
