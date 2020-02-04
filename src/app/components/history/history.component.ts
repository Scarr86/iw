import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { GeneratorBase } from '../../service/generator-sale.service';
import { from, of, Observable, combineLatest, range } from 'rxjs';
import { Sale } from 'src/app/models/sale.model';
import { Select, Store } from '@ngxs/store';
import { SaleState } from 'src/app/store/state/sale.state';
import { NameProductsSate } from 'src/app/store/state/name-products.state';
import { FormControl } from '@angular/forms';
import * as moment from 'moment'
import { mapTo, map, mergeScan, expand, mergeAll, takeWhile, switchMap, concatMap, tap, distinctUntilChanged, reduce, scan, shareReplay, share } from 'rxjs/operators';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class HistoryComponent implements OnInit, AfterViewInit {
  @Select(NameProductsSate.names) names$;

  dateFrom: FormControl = new FormControl();
  dateTo: FormControl = new FormControl();
  range$;
  sales;
  constructor(
    private genereteService: GeneratorBase,
    private store: Store
  ) { }




  ngOnInit() {
    moment.locale('ru');
    // this.range$ = combineLatest(
    //   this.dateFrom.valueChanges.pipe(distinctUntilChanged()),
    //   this.dateTo.valueChanges.pipe(distinctUntilChanged())
    // )
    //   .pipe(
    //     tap(_ => console.log("================")),
    //     switchMap(([start, end]) => of(start).pipe(
    //       expand(s => of(s.clone().add(1, "day"))),
    //       takeWhile((s) => s.isSameOrBefore(end, "day")))
    //     ),
    //     concatMap(d => this.store.selectOnce(SaleState.getSaleByDate(d)).pipe(map(s => [d, s]))),
    //     scan((acc, ds)=> {
    //       console.log([...acc, ds]);

    //       return [...acc, ds]
    //     } , [])
    //   );

    this.range$ = combineLatest(
      this.dateFrom.valueChanges.pipe(distinctUntilChanged()),
      this.dateTo.valueChanges.pipe(distinctUntilChanged())
    ).pipe(
      switchMap(([start, end]) => this.store.selectOnce(SaleState.getSaleByDateBetween(start, end))),
      map((s: Sale[]) => s.sort((s1, s2) => moment(s1.timestamp).isAfter(moment(s2.timestamp)) ? 1 : -1)),
      shareReplay(1)
    )


    this.range$.subscribe((s) => console.log(s));


    // console.log(moment([2020, 0, 1]), moment([2020, 0, 8]));
   
    this.dateFrom.setValue(moment([2020, 0, 1]))
    this.dateTo.setValue(moment([2020, 0, 8]));
  }
  ngAfterViewInit() {

    
  }

  generete() {
    this.sales = this.genereteService.genereteSale(new Date(2020, 0, 1));
    return JSON.stringify(this.sales, null, 2);
  }
}
