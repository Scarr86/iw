import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, ofActionSuccessful, ofActionCompleted } from '@ngxs/store';
import { Observable, merge, of, Subject, BehaviorSubject } from 'rxjs';
import { GetSales } from '../store/actions/sale.actions';
import { mapTo, switchMap, mergeMap, tap, startWith, shareReplay, share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StateLoadingService {

    private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _loadingTrue$: Observable<boolean>;
    private _loadingFalse$: Observable<boolean>;

    get loading$() {
        return this._isLoading$.asObservable();
    }

    constructor(private actions$: Actions) {

        this._loadingTrue$ = merge(
            actions$.pipe(ofActionDispatched(GetSales)),
        ).pipe(mapTo(true))

        this._loadingFalse$ = merge(
            actions$.pipe(ofActionCompleted(GetSales)),
        ).pipe(
            mapTo(false)
        );

        merge(this._loadingFalse$, this._loadingTrue$)
            .pipe(tap(v => console.log("[loading :]", v)))
            .subscribe(this._isLoading$);
    }
}