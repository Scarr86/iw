

export interface Product {
    name: string;
    price: number;
    count: number;
}

export interface Sale {
    id: number;
    date: Date;
    discount: number;
    productList: Product[];
}


