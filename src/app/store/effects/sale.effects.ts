import { Injectable, Injector } from "@angular/core";
import { Actions, ofType } from '../actions/actions';
import { from, of } from 'rxjs';
import { ESaleActions, GetSaleListSuccess, GetSaleListError } from '../actions/sale.actions';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';
import { FileService } from 'src/app/service/google-gapi/file.service';
import { ISale } from 'src/app/models/sale.model';
import { ISaleHTTP } from 'src/app/models/http-sale.interface';
import { createAotUrlResolver } from '@angular/compiler';
@Injectable({ providedIn: "root" })
export class SaleEffect {
    actions$ = this.actions.actions$;
    getSaleList$ = this.actions$.pipe(
        ofType(ESaleActions.GetSaleList),
        switchMap(id =>
            from(this.fileService.file({ id: "1KMrG-wt5syMh1o0TkYg_TSpXtPfiJjs9", alt: "media" })).pipe(
                pluck("result"),
                map(saleHttp => new GetSaleListSuccess(this.toSale(<ISaleHTTP>saleHttp))),
                catchError((err: Error) => of(new GetSaleListError(err)))
            )
        ),
    )

    constructor(public actions: Actions, private fileService: FileService) {
        console.log("create Sale Effects");

    }
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