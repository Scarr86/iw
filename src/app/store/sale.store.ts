import { Injectable, Optional } from "@angular/core";
import { Observable, merge } from 'rxjs';
import { ISaleState, initSaleState } from './state/sale.state';
import { Action } from './actions/actions';
import { SaleEffect } from './effects/sale.effects';
import { startWith, scan, publishReplay, refCount, map, tap, shareReplay, finalize } from 'rxjs/operators';
import { saleReducers } from './reducers/sale.reducers';
import { SaleActions, ESaleActions, GetSaleList } from './actions/sale.actions';
import { ISale } from '../models/sale.model';

/*
* Global
*/
export let stateSales: Observable<ISaleState>;

@Injectable({ providedIn: "root" })
export class SaleStore {

    actions$ = this.saleEffect.actions$;
    /**
    * Dispatcher
    */
    private dispatcher$: Observable<Action> = merge(
        this.actions$,
        this.saleEffect.getSaleList$
    );
    /**
    * State Reducer
    */
    saleState$: Observable<ISaleState> = this.dispatcher$
        .pipe(
            startWith(initSaleState),
            scan((state: ISaleState, action: SaleActions) => {
                console.log(action.type, '[state]', state);
                return saleReducers(state, action);;
            }),
            // tap(state => console.log("[SALE new State]", state)),
            // publishReplay(1),
            // refCount(),
            finalize(() => console.log("FIN ")),
            shareReplay(1),

        )

    /**
    * Selectors
    */
    selectSaleList() {
        return this.saleState$.pipe(map(state => state.sales && state.sales));
    }
    selectIsLoading() {
        return this.saleState$.pipe(map(state => state.loading))
    }
    slectorBaseID() {
        return this.saleState$.pipe(map(state => state.baseID));
    }
    constructor(private saleEffect: SaleEffect) {
        stateSales = this.saleState$;
    }

    private dispatch(action: SaleActions): void {
        this.actions$.next(action);
    }

    load() {
    }
    update() {
    }
    getSale() {
    }
    addSale(sale: ISale) {
    }
    deleteSale() {
    }

    getSaleList() {
        this.dispatch(new GetSaleList("1KMrG-wt5syMh1o0TkYg_TSpXtPfiJjs9"));
    }



}