import { Sale } from 'src/app/models/sale.model';
import { State, NgxsOnInit, StateContext, Store, Action, Selector, createSelector } from '@ngxs/store';
import { patch, removeItem, updateItem, append } from '@ngxs/store/operators'
import { FileService } from 'src/app/service/google-gapi/file.service';
import { from, of } from 'rxjs';
import { pluck, tap, filter, switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { GapiState } from './auth.state';
import { GetSales, SetBaseInfo, DeleteBaseInfo, DeleteSale, ChangeSale, AddSale, UploadSales } from '../actions/sale.actions';
import { File } from '../../models/file.model'
import { compareDay } from 'src/app/lib/lib';
import { SalesService } from 'src/app/service/sales.service';


function saveSales(ctx: StateContext<SaleStateModel>) {
    let sales = ctx.getState().sales;
    localStorage.setItem('mockSales', JSON.stringify({ sales }));
}


export interface SaleStateModel {
    sales: Sale[] | null;
    nameProduct: string[],
    baseInfo: File | null
}

@State<SaleStateModel>({
    name: "SaleStore",
    defaults: {
        sales: null,
        nameProduct: [
            "Футболка",
            "Майка",
            "Трусы",
            "Носки",
            "Штаны",
        ],
        baseInfo: null
    }
})
export class SaleState implements NgxsOnInit {
    constructor(
        private fileServise: FileService,
        private store: Store,
        private salesService: SalesService
    ) { }

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



        return this.salesService.getSales().pipe(
            map(({ sales }) => sales.map(s => (new Sale(s.discount, s.productList, s.timestamp, s.id)))),
            tap(sales => ctx.patchState({ sales }))
        )

        // let baseInfo: File = ctx.getState().baseInfo || JSON.parse(localStorage.getItem("baseInfo"))
        // if (!baseInfo) {
        //     return;
        // }

        // return from(this.fileServise.file(baseInfo.id, "media"))
        //     .pipe(
        //         pluck('result', 'sales'),
        //         map((sales) => (sales as Sale[]).map(s => (new Sale(s.id, s.timestamp, s.discount, s.productList)))),
        //         tap(sales => {
        //             console.log(sales);

        //             ctx.patchState({ sales, baseInfo })
        //         })
        //     )
    }
    @Action(UploadSales)
    uploadSales(ctx: StateContext<SaleStateModel>){
        
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

    @Action(AddSale)
    addSale(ctx: StateContext<SaleStateModel>, { sale }: AddSale) {
        let maxId = Math.max(...ctx.getState().sales.map(s => s.id));
        sale.id = maxId + 1;
        ctx.setState(
            patch({
                sales: append([sale])
            })
        )
        return of(sale);
    }

    @Action(ChangeSale)
    changeSale(ctx: StateContext<SaleStateModel>, { id, sale }: ChangeSale) {
        let salepre = ctx.getState().sales.find(s => s.id == id);
        // console.log("salepre", salepre);
        // console.log("id: ", id);

        ctx.setState(
            patch({
                sales: updateItem<Sale>(s => s.id === id, sale)
            })
        )
        // let salepost = ctx.getState().sales.find(s => s.id == id);
        // console.log("salepost", salepost, sale);

        //do api
        // saveSales(ctx);
    }


    @Selector()
    static baseInfo(state: SaleStateModel) {
        return state.baseInfo;
    }

    @Selector()
    static sales(state: SaleStateModel) {
        return state.sales;
    }

    @Selector()
    static nameProduct(state: SaleStateModel) {
        return state.nameProduct;
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
