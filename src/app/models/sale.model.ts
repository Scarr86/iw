import { Product } from './product.model';

export interface ISale {
    id: number;
    date: Date;
    discount: number;
    productList: Product[];
}

export class Sale implements ISale {
    constructor(
        public id,
        public date,
        public discount = 0,
        public productList: Product[]
    ) { }
    get total() {
        return this.productList.reduce((sum, p) => sum += p.total, 0) - this.discount;
    }
}