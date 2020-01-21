import { Injectable } from "@angular/core";
import { Actions, ofType } from '../actions/actions';
import { from, of } from 'rxjs';
import { ESaleActions, GetSaleListSuccess, GetSaleListError } from '../actions/sale.actions';
import { switchMap, map, catchError, pluck, first } from 'rxjs/operators';
import { FileService } from 'src/app/service/google-gapi/file.service';
import { ISale } from 'src/app/models/old-sale.model';
import { ISaleHTTP } from 'src/app/models/http-sale.interface';
import { selectBaseID } from '../selectors/sale.selectors';
import { SaleStore } from '../old-sale.store';
@Injectable({ providedIn: "root" })
export class SaleEffect {
    actions$ = this.actions;
    getSaleList$ = this.actions$.pipe(
        ofType(ESaleActions.GetSaleList),
        switchMap(action =>
            from(this.fileService.file({ id: action.payload, alt: "media" }))
                .pipe(
                    pluck("result"),
                    map(saleHttp => new GetSaleListSuccess(this.toSale(<ISaleHTTP>saleHttp))),
                    catchError((err: Error) => of(new GetSaleListError(err)))
                )
        ),
    )
    constructor(public actions: Actions, private fileService: FileService) { }

    toSale(saleHttp: ISaleHTTP): ISale[] {
        return saleHttp.sales.map(s => ({ ...s, date: new Date(s.date) }));
    }
}


// const injector = Injector.create({
//     providers: [
//       {provide: SaleEffect, deps: [Actions]}, {provide: Actions, deps: []}
//     ]
//   });
//   expect(injector.get(SaleEffect).actions instanceof Actions).toBe(true);