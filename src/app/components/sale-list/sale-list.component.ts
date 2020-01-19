import { Component, OnInit, AfterViewInit, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter, ViewEncapsulation, HostBinding } from '@angular/core';
import { SaleStore } from 'src/app/store/sale.store';
import { SaleEffect } from 'src/app/store/effects/sale.effects';
import { LogService } from 'src/app/service/log.service';
import { Actions } from 'src/app/store/actions/actions';
import { isArray } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { compareDay } from '../../lib/lib';
import { ISale } from 'src/app/models/sale.model';
import { map, filter, skip, tap, withLatestFrom, switchMap, mapTo, finalize } from 'rxjs/operators';
import { Subject, combineLatest, BehaviorSubject, Observable } from 'rxjs';
import { ThemeService } from 'src/app/service/theme.service';



@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.Emulated
})
export class SaleListComponent implements OnInit, AfterViewInit {
  // date: Date = new Date();
  // loading$ = this.saleStore.selectIsLoading();
  @Input() sales: ISale[] = [];
  @Output() select = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  // date$: Subject<{ forth?, to?} | never> = new Subject();
  // sales$: Observable<ISale[]> = this.date$.pipe(
  //   switchMap(options => this.saleStore.selectSaleList(options)),
  //   tap((v) => console.log(" emmit", v.length)),
  //   finalize(() => console.log("fin sale "))
  // )

  onSelect(s: ISale) {
    this.select.emit(s.id);
  }
  onDelete(s: ISale) {
    this.delete.emit(s.id);
  }

  ngOnInit() {
    // let dateStr = localStorage.getItem("date-sales");
    // this.date = new Date(dateStr || Date.now());

    // this.date$.next({ forth: this.date, to: this.date })

    // this.sales$.subscribe(console.log);
    // this.saleStore.selectSaleList().subscribe(console.log)

    // this.saleStore.saleList$.subscribe((r) => {
    //   console.log("Sale list: ", r, isArray(r) && r[0]);

    // })
  }

  // date$: Subject<Date> = new Subject();
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


  // this.saleStore.selectSaleList({forth : this.date})
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
  constructor(public saleStore: SaleStore, private router: Router, private cdr: ChangeDetectorRef) {
  }


  ngAfterViewInit() {
    // let dateStr = localStorage.getItem("date-sales");
    // let date = new Date(dateStr ||  Date.now());
    setTimeout(() => {
      // this.date$.next({ forth: this.date, to: this.date })
      // this.date$.next()
      //   // this.saleStore.getSaleList();
    }, 0);
  }

  getSaleList() {
    // this.saleStore.getSeleList();
  }

  // onDateChange(event: MatDatepickerInputEvent<Date>) {
  //   this.date = new Date(event.value);
  //   this.dateChange.emit(this.date);
  // }

  // setDate(event: MatDatepickerInputEvent<Date>) {
  //   localStorage.setItem("date-sales", event.value.toString())
  //   this.date = event.value;
  //   // this.date$.next({ forth: event.value, to: event.value });
  // }

}
