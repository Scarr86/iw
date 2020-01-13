import { INameProduct } from './product-name.model';

export interface IProduct {
    name: string;
    price: number;
    count: number;
    total?:number;
}

export class Product implements IProduct{
    constructor(
        public name:string,
        public price:number,
        public count:number
    ){
       
    }

    get total():number{
        console.log("product count and price", this.count, this.price);
        
        return this.count * this.price;
    }
}