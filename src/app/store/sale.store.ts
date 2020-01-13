import { Injectable, Optional } from "@angular/core";
import { Observable, merge } from 'rxjs';
import { ISaleState, initSaleState } from './state/sale.state';
import { Action } from './actions/actions';
import { SaleEffect } from './effects/sale.effects';
import { startWith, scan, publishReplay, refCount, map, tap } from 'rxjs/operators';
import { saleReducers } from './reducers/sale.reducers';
import { SaleActions, ESaleActions, GetSaleList } from './actions/sale.actions';

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
                console.log("[Old State]", state);
                return saleReducers(state, action)
            }),
            tap(state => console.log("[New State]", state)),
            publishReplay(1),
            refCount(),
        )

    /**
    * Selectors
    */
    saleList$ = this.saleState$.pipe(map(state => state.sales));


    constructor(private saleEffect: SaleEffect) { 
        console.log("create sale store");
    }

    private dispatch(action: SaleActions): void {
        this.actions$.next(action);
    }

    getSeleList() {
        this.dispatch(new GetSaleList(""));
    }


}