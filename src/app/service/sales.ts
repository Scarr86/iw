import { IBrowser } from 'selenium-webdriver';


interface IProduct{
   name?:string;
   num?:number;
   price?:number;
   discount?:number
}

export interface ISale{
   name:string;
   productList:IProduct[]
}

interface ISaleDay{
   [day:number]:ISale[]
}
 interface ISaleMonth{
   [month:number]:ISaleDay
}

export interface ISaleBase{
   [year:number]: ISaleMonth;
}


export class Product implements IProduct {
   constructor(
      public name: string = '',
      public num: number = 0,
      public price: number = 0,
      public discount: number = 0) {

   }
}
export class Sale implements  ISale {
   constructor(public name: string , public productList:Product[]){}
}