

export class Product {
    constructor(
        public name: string,
        public price: number,
        public count: number
    ) { }
    get total() {
        return this.price * this.count
    }
}

export class Sale {
    constructor(
        public discount: number,
        public productList: Product[],
        public timestamp?: number,
        public id?,
    ) {
        if (typeof timestamp != 'undefined' && isNaN(timestamp)) throw "timestamp error type  NaN";
        this.productList = productList.map(p => new Product(p.name, p.price, p.count))
    }
    get date() {
        return new Date(this.timestamp);
    }
    set date(d: Date) {
        this.timestamp = d.valueOf();
    }
    get total() {
        return this.productList.reduce((sum, p) => sum += p.total, 0) - this.discount;
    }
    get count() {
        return this.productList.length;
    }
}
