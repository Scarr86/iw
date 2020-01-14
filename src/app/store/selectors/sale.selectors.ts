import { stateSales } from '../sale.store';
import { map } from 'rxjs/operators';
import { ISaleState } from '../state/sale.state';


function createSelector(fn: Function) {
    return stateSales.pipe(map(state => fn(state)));
}

export const selectBaseID = createSelector((state: ISaleState) => state.baseID)


