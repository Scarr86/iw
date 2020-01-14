import { Sale, ISale } from 'src/app/models/sale.model';


export interface ISaleState{
    baseID:string;
    sales: ISale[];
    selectedSale: ISale;
    loading: boolean,
    error: any
}

export const initSaleState:ISaleState={
    baseID:"1KMrG-wt5syMh1o0TkYg_TSpXtPfiJjs9", 
    sales: null,
    selectedSale: null,
    loading: false,
    error:null
}