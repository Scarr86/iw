import { ISaleState } from '../state/old-sale.state';
import { SaleActions, ESaleActions } from '../actions/old-sale.actions';

export const saleReducers = (state: ISaleState, action: SaleActions): ISaleState => {
  


    switch (action.type) {
        case ESaleActions.GetSaleList:
        case ESaleActions.GetSale:
            return {
                ...state,
                loading: true,
                error: null
            };

        case ESaleActions.GetSaleListSuccess:
            return {
                ...state,
                loading: false,
                sales: action.payload
            };

        case ESaleActions.GetSaleListError:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case ESaleActions.GetSaleSuccess:
            return {
                ...state,
                loading: false,
                selectedSale: action.payload
            };

        case ESaleActions.GetSaleError:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return { ...state };
    }
}


