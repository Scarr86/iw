import { Sale } from 'src/app/models/sale.model';
import { State, NgxsOnInit, StateContext, Store } from '@ngxs/store';
import { FileService } from 'src/app/service/google-gapi/file.service';
import { from } from 'rxjs';
import { pluck, tap, filter, switchMap, map } from 'rxjs/operators';
import { GapiState } from './gapi.state';


export interface SaleStateModel {
    sales: Sale[];
    baseId: string
}

@State<SaleStateModel>({
    name: "SaleStore",
    defaults: {
        sales: [],
        baseId: '1KMrG-wt5syMh1o0TkYg_TSpXtPfiJjs9'
    }
})
export class SaleState implements NgxsOnInit {
    constructor(private fileServise: FileService, private store: Store) { }

    ngxsOnInit(ctx: StateContext<SaleStateModel>) {
        const id = ctx.getState().baseId;
        this.store.select(GapiState.isSignedIn)
            .pipe(
                filter(isSignIn => isSignIn === true),
                switchMap(()=> from(this.fileServise.file(id, "media"))),
                pluck('result'),
                // map((sales) => [...sales] )
            )
            .subscribe(console.log)

        console.log("ngxsOnInit");


    }
}
