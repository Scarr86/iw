import { Sale, ISale } from 'src/app/models/sale.model';


export interface ISaleState{
    sales: ISale[];
    selectedSale: ISale;
    loading: boolean,
    error: any
}

export const initSaleState:ISaleState={
    sales: null,
    selectedSale: null,
    loading: false,
    error:null
}