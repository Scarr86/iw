import { Injectable } from '@angular/core';
import { SaleActions } from '../actions/sale.actions';
import { Actions, Action } from '../actions/actions';
import { Observable, merge } from 'rxjs';
import { SaleEffect } from '../effects/sale.effects';

@Injectable({ providedIn: "root" })
export class SaleDispacher<T = Action> extends Observable<T> {

     source: Observable<Action> = merge(
        this.action$,
        this.saleEffect.getSaleList$
    );
     constructor(public action$: Actions, public saleEffect: SaleEffect) {
        super()
    }
}
