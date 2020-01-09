import { Injectable } from '@angular/core';
import { from, of, Observable, interval, Subject, timer, throwError, BehaviorSubject } from 'rxjs';
import { tap, delay, finalize, publishReplay, refCount, filter, switchMap, shareReplay, repeat, publish, share, map, catchError, switchMapTo, startWith, withLatestFrom, reduce, take, retry, repeatWhen, multicast } from 'rxjs/operators';
import { LogService } from './log.service';
import { GeneratorBase } from './generator-sale.service';
import { Sale, Product, ISale, ISaleBase } from './sales';





export let salesBackEnd: Sale[] =
   [
      { name: "Sale 1", productList: [new Product("product 1", 1, 1000, 100), new Product("product 2", 2, 2000, 200), new Product("product 3", 3, 3000, 300)] },
      { name: "Sale 2", productList: [new Product("product 1", 4, 4000, 400), new Product("product 2", 5, 5000, 500)] },
      { name: "Sale 3", productList: [new Product("product 1", 5, 5000, 500)] }
   ];




@Injectable({ providedIn: "root" })
export class SaleService {

   sales$: Observable<Sale[]> = new Observable();
   update$: Subject<any> = new Subject();
   base$: BehaviorSubject<Sale[]> = new BehaviorSubject(null);
   getSale$: Subject<Date> = new Subject();

   constructor(private logService: LogService,
      private genBase: GeneratorBase) {
      this.log("SaleService Init");

      this.sales$ = this.getSale$.pipe(
         tap((date) => this.log(`fetch sales by ${date.toLocaleDateString()}`)),
         switchMap( date => this.load(date).pipe(
            retry(3),
            repeatWhen(() => this.update$.pipe(tap(_ => this.info("update"), null, () => this.info("complite")))),
            catchError(this.handleError<Sale[]>('getSales', []))
         )),
         // shareReplay(1),
         publishReplay(1),
         refCount(),
      );
   }


   getSales(date: Date) {
      this.getSale$.next(date);

      // this.sales$ = this.load(date).pipe(
      //    // withLatestFrom(of(date)),
      //    tap(() => this.log(`fetch sales by ${date.toLocaleDateString()}`)),
      //    retry(3),
      //    repeatWhen(() => this.update$.pipe(tap(_ => this.info("update"), null, () => this.info("complite")))),
      //    // shareReplay(1),
      //    publishReplay(1),
      //    // multicast(this.base$),
      //    refCount(),
      // )
      // return this.sales$.pipe(

      //    catchError(this.handleError<Sale[]>('getSales', []))
      // )
   }
   update() {
      this.update$.next(null);
   }
   addProduct() { }
   save() {
         this.saveToBackEnd().subscribe(() => this.update());
   }

   saveToBackEnd() {
      return of('saved').pipe(
         delay(100),
         // tap(()=> this.info("saved")),
      );
   }

   load(date: Date) {

      // test error
      // return timer(1000).pipe(
      //    tap(_=> this.info(`request server`)),
      //    switchMapTo(throwError('Something wrong!'))
      // );
      //====
      // return this.genBase.genereteSale().pipe(
      //    map((base: ISaleBase) => base[date.getFullYear()]),
      //    map((base) => base[date.getMonth()]),
      //    map(base => (base[date.getDate()] as Sale[])),
      //    tap(_ => this.info(`request server`)),
      //    delay(500)
      // )
      return of(salesBackEnd).pipe(
         tap(_=> this.info(`request server`)),
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