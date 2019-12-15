import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SaleService } from '../service/sale.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { Input } from '@angular/compiler/src/core';
import { Observable, from, Subscription, fromEvent, pipe, Subject, of } from 'rxjs';
import { tap, filter, switchMap, reduce, count, scan, take, finalize, map, repeatWhen } from 'rxjs/operators';
import { DownloadManager } from '../service/download-manager.service';
import { LogService } from '../service/log.service';
import { Sale } from '../service/sales';

@Component({
   selector: 'app-sale',
   templateUrl: './sale-list.component.html',
   styleUrls: ['./sale-list.component.scss'],
   // providers:[LogService]
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaleListComponent implements OnInit, OnDestroy, AfterViewInit {

   sales$: Observable<Sale[]>;
   update1$: Subject<any> = new Subject();
   date = new Date();
   constructor(
      private router: Router,
      private saleService: SaleService,
      private dm: DownloadManager,
      private log: LogService
   ) { }

   ngOnInit() {
      // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      // this.log.write(this.date.toLocaleDateString('ru-RU', options));

      // this.sales$ = this.saleService.getSales(this.date);
      this.sales$ = this.saleService.sales$;
   }
   ngAfterViewInit() {
      this.saleService.getSales(this.date);
   }

   ngOnDestroy() {
      this.log.write("unsubscribe SaleListComponent")
   }
   goToProductList(i: number) {
      this.router.navigate(
         ['product-list', i.toString()],
         {
            queryParams: {
               "date": this.date.getTime()
            }
         }
      )
   }


   // getNumProducts(i): Observable<number> {
   //    return this.saleService.getNumProducts(i);
   // }
   // getTotalPrice(i: number): Observable<number> {
   //    return this.saleService.getTotalPriseSale(i);
   // }

   addSale() {
      this.router.navigate(
         ['/product-list', 'newsale'],
      )
   }
   update() {
      this.saleService.update();
   }

}
