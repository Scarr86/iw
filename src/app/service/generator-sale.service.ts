import { Injectable } from '@angular/core';

import { interval, range, of, Observable, combineLatest, merge, forkJoin } from 'rxjs';

import { reduce, switchMap, tap, concatMap, map, scan, concatAll, publishReplay, refCount, finalize, shareReplay } from 'rxjs/operators';
import { Sale, Product, ISaleBase } from './sales';


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

   saleBase: ISaleBase;
   saleBase$: Observable<ISaleBase>;

   constructor() {
      let years$ = range(2018, 2)/*.pipe(tap(console.log))*/;
      let month$ = range(0, 12)/*.pipe(tap(console.log))*/;
      let date = (year: number, month: number) => {
         let maxDate = new Date(year, month + 1, 0).getDate();
         return range(1, maxDate);
      }
      this.saleBase$ = years$.pipe(
         concatMap(y => month$.pipe(map(m => [y, m]))),
         concatMap(([y, m]) => date(y, m).pipe(map(d => [y, m, d]))),
         reduce((obj: ISaleBase, date: number[]) => {
            let [y, m, d] = date;
            if (!obj[y]) obj[y] = {}
            if (!obj[y][m]) obj[y][m] = {};
            obj[y][m][d] = this.generateSales();
            return obj;
         }, {}),
         tap(() => console.log("Generete Base!!!")),
         publishReplay(1),
         refCount(),
      );
      // saleBase$.subscribe(b=> this.saleBase = b);
   }

   genereteSale() {
      return this.saleBase$;
   }

   private generateSales(): Sale[] {
      let sale: Sale[] = [];
      for (let i = 0; i < this.random(1, 3); i++) {
         sale[i] = {
            name: `sale ${i}`,
            productList: this.generateProductList(),
         }
      }
      return sale;
   }

   private generateProductList(): Product[] {
      let productsList: Product[] = [];

      for (let i = 0; i < this.random(0, namesProduct.length); i++) {
         productsList[i] = {
            num: this.random(1, 3),
            price: this.random(1, 3) * 1000,
            discount: this.random(1, 3) * 100,
            name: this.randomName(productsList.reduce((names, p) => [...names, p.name], [])),
         }
      }
      return productsList;
   }

   private random(from: number, to: number): number {
      let rand = from + Math.random() * (to - from + 1);
      return Math.floor(rand);
   }
   private randomName(names: string[]) {
      let freeName = namesProduct.filter(v => !~names.indexOf(v));
      return freeName[this.random(0, freeName.length - 1)];
   }
}
