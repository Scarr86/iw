import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, forkJoin, combineLatest, Observable, of, iif, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SaleService, Product, Sale, salesBackEnd } from 'src/app/service/sale.service';
import { map, switchMap, take, pluck, share, publish, refCount, publishReplay, tap, multicast } from 'rxjs/operators';
import { LogService } from 'src/app/service/log.service';

@Component({
   selector: 'app-product-list',
   templateUrl: './product-list.component.html',
   styleUrls: ['./product-list.component.scss'],
   // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {
   title$: Observable<string>;
   products$: Observable<Product[]>;
   newProduct: Product = new Product();
   sale$: Observable<Sale>;
   saleList$: Observable<Sale[]>;
   salse$: BehaviorSubject<Sale> = new BehaviorSubject(new Sale('', []))
   private subscription: Subscription = new Subscription();


   constructor(
      private saleService: SaleService,
      private location: Location,
      private activeRoute: ActivatedRoute,
      private log: LogService) { }

   ngOnInit() {
      this.saleList$ = this.activeRoute.queryParams.pipe(pluck('date'))
         .pipe(switchMap((date) => this.saleService.getSales(new Date(+date))),
         );

      this.sale$ = this.activeRoute.params.pipe(pluck('id')).pipe(
         switchMap(id => iif(() => id === 'newsale',
            of(new Sale("New Sale", [])).pipe(tap(console.log)),
            this.saleList$.pipe(map(sales => sales[id])))),
         multicast(this.salse$),
         // publishReplay(1),
         refCount()
      );

      this.title$ = this.sale$.pipe(pluck('name'));
      this.products$ = this.sale$.pipe(map(s => [...s.productList, this.newProduct]));
   }

   ngOnDestroy() {
   }

   goBack() {
      this.location.back();
   }
   addProduct() {
      let sale = this.salse$.getValue();

      this.newProduct.name = "name product";
      this.newProduct.price = 1000;

      sale.productList.push(this.newProduct);
      this.saleService.save(sale);
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
