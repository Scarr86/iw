import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, AfterContentInit, AfterViewInit } from '@angular/core';
import { Subscription, forkJoin, combineLatest, Observable, of, iif, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SaleService, salesBackEnd } from 'src/app/service/sale.service';
import { map, switchMap, take, pluck, share, publish, refCount, publishReplay, tap, multicast, filter, first } from 'rxjs/operators';
import { Sale, Product } from '../service/sales';

@Component({
   selector: 'app-product-list',
   templateUrl: './product-list.component.html',
   styleUrls: ['./product-list.component.scss'],
   // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {
   title$: Observable<string>;
   products$: Observable<Product[]>;
   sale$: Observable<Sale>;
   private subscription: Subscription = new Subscription();


   constructor(
      private saleService: SaleService,
      private location: Location,
      private activeRoute: ActivatedRoute,
   ) {
   }

   ngAfterViewInit() {
      this.activeRoute.queryParams.pipe(pluck('date')).pipe(filter(date => !isNaN(date)))
         .subscribe(date => {
            this.saleService.getSales(new Date(+date))
         });
   }



   ngOnInit() {
      // let saleList$ = this.activeRoute.queryParams.pipe(pluck('date'))
      //    .pipe(
      //       switchMap((date) => this.saleService.getSales(new Date(+date))),
      //       tap(console.log),
      //       first(s => !!s)
      //    );

      

      this.sale$ = this.activeRoute.params.pipe(pluck('id')).pipe(
         switchMap(id => iif(() => id === 'newsale',
            of(new Sale("New Sale", [])).pipe(tap(console.log)),
            this.saleService.sales$.pipe(map(sales => sales ? sales[id] : []))
            /*saleList$.pipe(map(sales => sales[id]))*/
         )),
         publishReplay(1),
         refCount()
      );

      this.title$ = this.sale$.pipe(pluck('name'));
      this.products$ = this.sale$
         .pipe(
            pluck('productList'),
            map(p => [...p, new Product()]),
         )
   }
   ngOnDestroy() {
   }

   goBack() {
      this.location.back();
   }
   addProduct() {
      // let sale = this.salse$.getValue();


      // sale.productList.push(this.newProduct);
      // this.saleService.save(sale);
      // this.salse$.getValue().productList.push(this.newProduct);

      // this.sale$.pipe(
      //    tap(console.log, null, () => console.log('complite')),
      //    map(s => {
      //       s.productList.push(this.newProduct);
      //       // this.update();
      //       return s;
      //    }),
      // ).subscribe(console.log);
   }

   update() {
      this.saleService.update();
   }

}
