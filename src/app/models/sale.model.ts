import { IProduct } from './product.model';

export interface ISale {
    id: number;
    date: Date;
    discount: number;
    productList: IProduct[];
}

export class Sale implements ISale {
    id: number
    date: Date;
    discount: number
    productList: IProduct[];

    constructor({ id,
        date = new Date(),
        discount = 0,
        productList = []
    }: ISale) {
        this.id = id;
        this.discount = discount;
        this.date = date;
        this.productList = productList;
    }
    get total() {
        return this.productList.reduce((sum, p) => {
            console.log("product total",p, p.total);
            
            return sum += p.total;
        }, 0) - this.discount;
    }
}