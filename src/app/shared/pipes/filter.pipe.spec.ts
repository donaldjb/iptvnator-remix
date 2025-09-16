import { FilterPipe, normalizeFilterValue } from './filter.pipe';

describe('FilterPipe', () => {
    let pipe: FilterPipe;

    beforeEach(() => {
        pipe = new FilterPipe();
    });

    it("filters values that contain the Turkish 'İ' character", () => {
        const result = pipe.transform([{ name: 'İstanbul' }], 'istanbul', 'name');

        expect(result).toEqual([{ name: 'İstanbul' }]);
    });

    it('filters values containing diacritics', () => {
        const items = [{ name: 'Café' }, { name: 'Thé' }];

        const result = pipe.transform(items, 'cafe', 'name');

        expect(result).toEqual([{ name: 'Café' }]);
    });

    it('normalizes values by lowercasing and removing diacritics', () => {
        expect(normalizeFilterValue('Éléphant')).toBe('elephant');
    });
});
