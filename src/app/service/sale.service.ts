import { Injectable } from '@angular/core';
import { from, of, Observable, interval, Subject, timer, throwError } from 'rxjs';
import { tap, delay, finalize, publishReplay, refCount, filter, switchMap, shareReplay, repeat, publish, share, map, catchError, switchMapTo, startWith, withLatestFrom, reduce, take, retry, repeatWhen } from 'rxjs/operators';
import { LogService } from './log.service';

export class Product {
   constructor(
      public name: string = '',
      public num: number = 0,
      public price: number = 0,
      public discount: number = 0) {

   }
}

export class Sale {
   // name: string;
   // productList: Product[];
   constructor(public name: string , public productList:Product[]){}
}

export let salesBackEnd: Sale[] =
   [
      { name: "Sale 1", productList: [new Product("product 1", 1, 1000, 100), new Product("product 2", 2, 2000, 200), new Product("product 3", 3, 3000, 300)] },
      { name: "Sale 2", productList: [new Product("product 1", 4, 4000, 400), new Product("product 2", 5, 5000, 500)] },
      { name: "Sale 3", productList: [new Product("product 1", 5, 5000, 500)] }
   ];




@Injectable({ providedIn: "root" })
export class SaleService {

   sales$: Observable<Sale[]> = new Observable();
   update$:Subject<any> = new Subject();

   constructor(private logService: LogService) {
      this.log("SaleService Init");
   }


   getSales(date: Date) {
   
      this.sales$ = this.load(date).pipe(
         // withLatestFrom(of(date)),
         retry(3),
         repeatWhen(()=> this.update$.pipe(tap(_=>this.info("update"), null, ()=> this.info("complite")))),
         // shareReplay(1),
         publishReplay(1),
         refCount(),
      )
      return this.sales$.pipe(
         tap(() => this.log(`fetch sales by ${date.toLocaleDateString()}`)),
         catchError(this.handleError<Sale[]>('getSales',[]))
      )
   }
   update(){
      this.update$.next(null);
   }
   addProduct(){}
   save(sale:Sale){
      if( !~salesBackEnd.indexOf(sale)){
         salesBackEnd.push(sale);
      }
      this.saveToBackEnd().subscribe(()=>this.update());
      // return this.saveToBackEnd();
   }

   // getNumProducts(i: number): Observable<number> {
   //    return this.sales$.pipe(
   //       map((s) => s[i].productList.length),
   //       tap((l) => this.log(`fetch number of products on sale N${i}: ${l} `)),
   //       catchError(this.handleError<number>('getNumProducts', 0))
   //    )
   // }
   // getTotalPriseSale(i: number): Observable<number> {
   //    return this.sales$.pipe(
   //       switchMap((s) => from(s[i].productList)),
   //       reduce((s, p: Product) => s += p.price * p.num - p.discount, 0),
   //       tap((t) => this.log(`fetch total price of products on sale N${i}: ${t}`)),
   //       catchError(this.handleError<number>('getTotalPriseSale', 0))
   //    )
   // }
   saveToBackEnd(){
      return of('saved').pipe(
         delay(100),
         // tap(()=> this.info("saved")),
         );
   }

   load(date:Date) {
      // return timer(1000).pipe(
      //    tap(_=> this.info(`request server`)),
      //    switchMapTo(throwError('Something wrong!'))
      // );
      return of(salesBackEnd).pipe(
         tap(_=> this.info(`request server ${date.toLocaleDateString()}`)),
         delay(1000)
         );
   }

   log(msg: string) {
      this.logService.write(`SaleService: ${msg}`);
   }
   info(msg: string) {
      this.logService.write(`SaleService: ${msg}`, 'accent');
   }
   warp(msg: string) {
      this.logService.write(`SaleService: ${msg}`, 'warn');
   }

   private handleError<T>(operation = "operation", result?: T) {
      return (error: any): Observable<T> => {
        this.warp(`${operation} failed: ${error}`);
        return of(result as T);
      };
    }

}