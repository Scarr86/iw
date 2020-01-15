import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { SaleStore } from 'src/app/store/sale.store';
import { SaleEffect } from 'src/app/store/effects/sale.effects';
import { LogService } from 'src/app/service/log.service';
import { Actions } from 'src/app/store/actions/actions';
import { isArray } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { compareDay } from '../../lib/lib';
import { ISale } from 'src/app/models/sale.model';
import { map, filter, skip, tap, withLatestFrom, switchMap, mapTo } from 'rxjs/operators';
import { Subject, combineLatest, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
  providers: [LogService]
})
export class SaleListComponent implements OnInit, AfterViewInit {
  // date: Date = new Date();
  title = "Продажи";
  loading$ = this.saleStore.selectIsLoading();
  date$: Subject<Date> = new Subject();
  // sales$ = combineLatest(this.date$.pipe(tap(console.log)), this.saleStore.selectSaleList().pipe(tap(console.log)))
  //   .pipe(
  //     map(
  //       ([date, sales]) => {
  //         console.log(date, sales);
          
  //         // localStorage.setItem("date-sales", date.toString())
  //         let s = sales && sales.filter(s => !compareDay(s.date, { from: date }))
  //         return s;
  //       }
  //     )
  //   )
    sales$ = this.saleStore.selectSaleList()
    // .pipe(mapTo([]));
  // sales$ = this.date$.pipe(
  //   // withLatestFrom(this.saleStore.selectSaleList()),
  //   switchMap((d) => this.saleStore.selectSaleList()),
  //   map(
  //     ([date, sales]) => {
  //       let s = sales && sales.filter(s => !compareDay(s.date, { from: date }))
  //       console.log(date, s);
  //       return s;
  //     }
  //   )
  // )

  // this.saleStore.selectSaleList()
  //   .pipe(
  //     skip(2),
  //     map(
  //       (s: ISale[]) => s && s.filter(s => !compareDay(s.date, { from: this.date }))
  //     ));
  constructor(public saleStore: SaleStore, private router: Router) { }

  ngOnInit() {
    // this.saleStore.saleList$.subscribe((r) => {
    //   console.log("Sale list: ", r, isArray(r) && r[0]);

    // })

  }
  ngAfterViewInit() {
    let dateStr = localStorage.getItem("date-sales");
    let date = new Date(dateStr ||  Date.now());
    setTimeout(() => {
      this.date$.next(date)
    //   // this.saleStore.getSaleList();
    }, 0);
  }

  getSaleList() {
    // this.saleStore.getSeleList();
  }
  setDate(event: MatDatepickerInputEvent<Date>) {
    localStorage.setItem("date-sales", event.value.toString())
    this.date$.next(event.value);
  }
  goToProductList(sale: ISale) {
    this.router.navigate(
      ['product-list', sale.id],
    )
  }
  deleteSale(sale, ev){
    console.log(sale, ev);
    

  }

}
