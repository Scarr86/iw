import { ISale } from 'src/app/models/sale.model';
import { Action } from './actions';



export enum ESaleActions {
    GetSaleList = '[Sale] Get SaleList',
    GetSaleListSuccess = '[Sale] Get SaleList Success',
    GetSaleListError = '[Sale] Get SaleList Failed',

    GetSale = '[Sale] Get sale',
    GetSaleSuccess = '[Sale] Get Sale Success',
    GetSaleError = '[Sale] Get sale Failed',

}

export class GetSaleList implements Action {
    public readonly type = ESaleActions.GetSaleList;
    constructor(public payload: string){}
}
export class GetSaleListSuccess implements Action {
    public readonly type = ESaleActions.GetSaleListSuccess;
    constructor(public payload: ISale[]) { }
}
export class GetSaleListError implements Action {
    public readonly type = ESaleActions.GetSaleListError;
    constructor(public payload: Error) { }
}

export class GetSale implements Action {
    public readonly type = ESaleActions.GetSale;
    constructor(public payload: number) { }
}
export class GetSaleSuccess implements Action {
    public readonly type = ESaleActions.GetSaleSuccess;
    constructor(public payload: ISale) { }
}
export class GetSaleError implements Action {
    public readonly type = ESaleActions.GetSaleError;
    constructor(public payload: Error) { }
}
export type SaleActions = GetSale | GetSaleSuccess | GetSaleError | GetSaleList | GetSaleListSuccess | GetSaleListError;
