import { INameProduct } from './product-name.model';

export interface IProduct {
    name: string;
    price: number;
    count: number;
}

export class Product implements IProduct{
    constructor(
        public name:string,
        public price:number,
        public count:number
    ){
       
    }

    get total(){
        return this.count * this.price;
    }
}