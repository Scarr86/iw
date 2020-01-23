import { Sale } from 'src/app/models/sale.model';
import { State, NgxsOnInit, StateContext, Store, Action, Selector, createSelector } from '@ngxs/store';
import { patch, removeItem, updateItem } from '@ngxs/store/operators'
import { FileService } from 'src/app/service/google-gapi/file.service';
import { from, of } from 'rxjs';
import { pluck, tap, filter, switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { GapiState } from './gapi.state';
import { GetSales, SetBaseInfo, DeleteBaseInfo, DeleteSale, ChangeSale } from '../actions/sale.actions';
import { File } from '../../models/file.model'
import { compareDay } from 'src/app/lib/lib';


function saveSales(ctx: StateContext<SaleStateModel>) {
    let sales = ctx.getState().sales;
    localStorage.setItem('mockSales', JSON.stringify({ sales }));
}


export interface SaleStateModel {
    sales: Sale[] | null;
    baseInfo: File | null
}

@State<SaleStateModel>({
    name: "SaleStore",
    defaults: {
        sales: null,
        baseInfo: null
    }
})
export class SaleState implements NgxsOnInit {
    constructor(private fileServise: FileService, private store: Store) { }

    ngxsOnInit(ctx: StateContext<SaleStateModel>) {
        // let sales = localStorage.getItem('mockSales');
        // ctx.patchState(JSON.parse(sales, (key, val) => {
        //     return key == "date" ? new Date(val) : val;
        // }))
        this.store.select(GapiState.isSignedIn)
            .pipe(filter(isSignIn => isSignIn === true))
            .subscribe(() => {
                ctx.dispatch(new GetSales());
            })
    }

    @Action(GetSales)
    getSales(ctx: StateContext<SaleStateModel>) {
        let baseInfo: File = ctx.getState().baseInfo || JSON.parse(localStorage.getItem("baseInfo"))
        if (!baseInfo) {
            return;
        }
        return from(this.fileServise.file(baseInfo.id, "media"))
            .pipe(

                map(response => JSON.parse(response.body, (key, val) => {
                    if (key == 'date')
                        return new Date(val);
                    return val;
                })),
                tap(body => ctx.patchState({ sales: body["sales"], baseInfo }))
            )
    }

    @Action(SetBaseInfo)
    setBaseInfo(ctx: StateContext<SaleStateModel>, { baseInfo }: SetBaseInfo) {
        localStorage.setItem("baseInfo", JSON.stringify(baseInfo));
        ctx.patchState({ baseInfo });
        ctx.dispatch(new GetSales());
    }

    @Action(DeleteBaseInfo)
    deleteBaseInfo(ctx: StateContext<SaleStateModel>) {
        localStorage.removeItem("baseInfo");
        ctx.patchState({ baseInfo: null });
    }
    @Action(DeleteSale)
    deleteSale(ctx: StateContext<SaleStateModel>, { id }: DeleteSale) {
        ctx.setState(
            patch({
                sales: removeItem<Sale>(s => s.id === id)
            })
        )
        // saveSales(ctx);
        //do api
    }

    @Action(ChangeSale)
    changeSale(ctx: StateContext<SaleStateModel>, { id, sale }: ChangeSale) {
        ctx.setState(
            patch({
                sales: updateItem<Sale>(s => s.id === id, sale)
            })
        )
        // saveSales(ctx);
        //do api
    }

    @Selector()
    static baseInfo(state: SaleStateModel) {
        return state.baseInfo;
    }

    @Selector()
    static sales(state: SaleStateModel) {
        return state.sales;
    }

    static getSaleByDate(date: Date) {
        return createSelector(
            [SaleState],
            (state: SaleStateModel) => {
                return state.sales && state.sales.filter(s => compareDay(s.date, date, date) === 0)
            }
        )
    }

    static getSaleById(id: number) {
        return createSelector(
            [SaleState],
            (state: SaleStateModel) => {
                return state.sales && state.sales.find(s => s.id === id)
            }
        )
    }
}
