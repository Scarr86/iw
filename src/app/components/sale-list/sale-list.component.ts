import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SaleStore } from 'src/app/store/sale.store';
import { SaleEffect } from 'src/app/store/effects/sale.effects';
import { LogService } from 'src/app/service/log.service';
import { Actions } from 'src/app/store/actions/actions';
import { isArray } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { compareDay } from '../../lib/lib';
import { ISale } from 'src/app/models/sale.model';
import { map, filter, skip, tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Subject, combineLatest, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
  providers: [LogService]
})
export class SaleListComponent implements OnInit, AfterViewInit {
  // date: Date = new Date();
  loading$ = this.saleStore.selectIsLoading();
  date$: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  sales$ = combineLatest(this.date$, this.saleStore.selectSaleList())
    .pipe(
      map(
        ([date, sales]) => {
          let s = sales && sales.filter(s => !compareDay(s.date, { from: date }))
          console.log(date, s);
          return s;
        }
      )
    )
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
    // this.date$.
    setTimeout(() => {
      this.saleStore.getSaleList();
    }, 0);
  }

  getSaleList() {
    // this.saleStore.getSeleList();
  }
  setDate(event: MatDatepickerInputEvent<Date>) {
    // this.date = event.value;
    this.date$.next(event.value);
  }
  // goToProductList(i: number) {
  //   this.router.navigate(
  //     ['product-list', i.toString()],
  //     {
  //       queryParams: {
  //         "date": this.date.getTime()
  //       }
  //     }
  //   )
  // }

}
