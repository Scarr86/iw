import { Injectable } from '@angular/core';

import { interval, range, of, Observable, combineLatest, merge, forkJoin } from 'rxjs';

import { reduce, switchMap, tap, concatMap, map, scan, concatAll, publishReplay, refCount, finalize, shareReplay } from 'rxjs/operators';
import { Product, Sale } from '../models/sale.model';
// import { Sale, Product, ISaleBase } from './sales';


let namesProduct = [
   "Футболка",
   "Майка",
   "Трусы",
   "Носки",
   "Штаны"
]


@Injectable({
   providedIn: 'root'
})
export class GeneratorBase {

   // saleBase: ISaleBase;
   // saleBase$: Observable<ISaleBase>;

   constructor() {
      // let years$ = range(2018, 2)/*.pipe(tap(console.log))*/;
      // let month$ = range(0, 12)/*.pipe(tap(console.log))*/;
      // let date = (year: number, month: number) => {
      //    let maxDate = new Date(year, month + 1, 0).getDate();
      //    return range(1, maxDate);
      // }
      // this.saleBase$ = years$.pipe(
      //    concatMap(y => month$.pipe(map(m => [y, m]))),
      //    concatMap(([y, m]) => date(y, m).pipe(map(d => [y, m, d]))),
      //    reduce((obj: ISaleBase, date: number[]) => {
      //       let [y, m, d] = date;
      //       if (!obj[y]) obj[y] = {}
      //       if (!obj[y][m]) obj[y][m] = {};
      //       obj[y][m][d] = this.generateSales();
      //       return obj;
      //    }, {}),
      //    tap(() => console.log("Generete Base!!!")),
      //    publishReplay(1),
      //    refCount(),
      // );
      // saleBase$.subscribe(b=> this.saleBase = b);
   }
   *genDate(from: Date, to: Date = new Date()) {
      while (from.getTime() <= to.getTime()) {
         yield from;
         from.setDate(from.getDate() + 1);
      }
   }

   id: number = 1;
   randomProduct() {
      return new Product(this.randomName(), this.random(1, 5) * 1000, this.random(1, 5));
   }
   genereteSale(from: Date, to: Date = new Date()): { sales: Sale[] } {

      // let json = localStorage.getItem("mockSales");
      // if (json) {
      //    return JSON.parse(json, (key, val) => {
      //       if (key == 'date')
      //          return new Date(val);
      //       return val
      //    })
      // }

      let sales: Sale[] = [];
      let id = 1;
      for (let date of this.genDate(from, to)) {
         let countSales = this.random(0, 5);
         while (countSales--) {
            let productList: Product[] = Array.from({ length: this.random(1, namesProduct.length) }, () => this.randomProduct());
            let sale: Sale = new Sale(
               this.random(1, 3) * 100,
               productList,
               date.getTime() ,
               id++,
            );
            sales.push(sale);
         }
      }
      // localStorage.setItem("mockSales", JSON.stringify({ sales }))
      return { sales };
   }

   // private generateSales(): Sale[] {
   //    let sale: Sale[] = [];
   //    for (let i = 0; i < this.random(1, 3); i++) {
   //       sale[i] = {
   //          name: `sale ${i}`,
   //          productList: this.generateProductList(),
   //       }
   //    }
   //    return sale;
   // }

   // private generateProductList(): Product[] {
   //    let productsList: Product[] = [];

   //    for (let i = 0; i < this.random(0, namesProduct.length); i++) {
   //       productsList[i] = {
   //          num: this.random(1, 3),
   //          price: this.random(1, 3) * 1000,
   //          discount: this.random(1, 3) * 100,
   //          name: this.randomName(productsList.reduce((names, p) => [...names, p.name], [])),
   //       }
   //    }
   //    return productsList;
   // }

   private random(from: number, to: number): number {
      let rand = from + Math.random() * (to - from + 1);
      return Math.floor(rand);
   }
   names = [];
   // private *randomName() {
   //    let names = [];
   //    while (true) {
   //       if (names.length === namesProduct.length) {
   //          names = [];
   //       }
   //       let freeNames = namesProduct.filter(v => !~names.indexOf(v));
   //       let freeName = freeNames[this.random(0, freeNames.length - 1)];
   //       names.push(freeName);
   //       console.log("names:" , names);

   //       yield freeName;
   //       break;
   //    }
   // }

   private randomName() {
      if (this.names.length === namesProduct.length) {
         this.names = [];
      }
      let freeNames = namesProduct.filter(v => !~this.names.indexOf(v));
      let freeName = freeNames[this.random(0, freeNames.length - 1)];
      this.names.push(freeName)
      return freeName;
   }
}
