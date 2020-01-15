import { Injectable, Optional } from "@angular/core";
import { Observable, merge, from, empty } from 'rxjs';
import { ISaleState, initSaleState } from './state/sale.state';
import { Action, Actions } from './actions/actions';
import { SaleEffect } from './effects/sale.effects';
import { startWith, scan, publishReplay, refCount, map, tap, shareReplay, finalize, switchMap, toArray, filter, reduce } from 'rxjs/operators';
import { saleReducers } from './reducers/sale.reducers';
import { SaleActions, ESaleActions, GetSaleList } from './actions/sale.actions';
import { ISale } from '../models/sale.model';
import { SaleDispacher } from './dispatcher/dispatcher.sale';
import { compareDay } from '../lib/lib';

/*
* Global
*/
export let stateSales: Observable<ISaleState>;

@Injectable({ providedIn: "root" })
export class SaleStore {

    saleEffect: SaleEffect;

    // actions$ = this.saleEffect.actions$;
    /**
    * Dispatcher
    */
    // private dispatcher$: Observable<Action> = merge(
    //     this.actions$,
    //     this.saleEffect.getSaleList$
    // );
    /**
    * State Reducer
    */
    saleState$: Observable<ISaleState> = this.dispatcher$
        .pipe(
            startWith(initSaleState),
            scan((state: ISaleState, action: SaleActions) => {
                let _state = saleReducers(state, action);;
                console.log(action.type, '[state]', _state);
                return _state;
            }),
            // tap(state => console.log("[SALE new State]", state)),
            finalize(() => console.log("FIN ")),
            shareReplay(1),
            // publishReplay(1),
            // refCount(),

        )

    /**
    * Selectors
    */
    selectSaleList(options: { forth?: Date, to?: Date } = { forth: undefined, to: undefined }) {
        return this.saleState$
            .pipe(
                map(state => state.sales ? 
                    state.sales.filter(sale => !compareDay(sale.date, options.forth, options.to)) 
                    : []),
            
                // map(sale =>  )
                // toArray()
                // switchMap( obs => obs)


            );
    }
    selectIsLoading() {
        return this.saleState$.pipe(map(state => state.loading))
    }
    slectorBaseID() {
        return this.saleState$.pipe(map(state => state.baseID));
    }
    // constructor(private actions$: Actions, private saleEffect: SaleEffect) {
    constructor(private actions$: Actions, private dispatcher$: SaleDispacher) {
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