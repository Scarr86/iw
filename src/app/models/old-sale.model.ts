import { IProduct } from './product.model';

export interface ISale {
    id?: number;
    date:  number;
    discount: number;
    productList: IProduct[];
}

export class Sale implements ISale {
    id: number
    date: number;
    discount: number
    productList: IProduct[];

    constructor({ id,
        date,
        discount = 0,
        productList = []
    }: ISale) {
        this.id = id;
        this.discount = discount;
        this.date = date;// new Date(date);
        this.productList = productList;
    }
    get total() {
        return this.productList.reduce((sum, p) => {
            return sum += p.total;
        }, 0) - this.discount;
    }
}