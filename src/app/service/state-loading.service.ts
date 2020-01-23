import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, ofActionSuccessful, ofActionCompleted } from '@ngxs/store';
import { Observable, merge, of } from 'rxjs';
import { GetSales } from '../store/actions/sale.actions';
import { mapTo, switchMap, mergeMap, tap, startWith, shareReplay, share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StateLoadingService {

    isLoading$: Observable<boolean>;
    private _loadingTrue$: Observable<boolean>;
    private _loadingFalse$: Observable<boolean>;
    constructor(private actions$: Actions) {

        this._loadingTrue$ = merge(
            actions$.pipe(ofActionDispatched(GetSales)),
        ).pipe(mapTo(true))

        this._loadingFalse$ = merge(
            actions$.pipe(ofActionCompleted(GetSales)),
        ).pipe(
            mapTo(false)
        );


        this.isLoading$ = merge(this._loadingFalse$, this._loadingTrue$).pipe( share(), tap(console.log));
    }
}