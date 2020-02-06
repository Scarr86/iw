import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GeneratorBase } from '../../service/generator-sale.service';
import { from, of, Observable, combineLatest, range, Subscribable, Subscription } from 'rxjs';
import { Sale } from 'src/app/models/sale.model';
import { Select, Store } from '@ngxs/store';
import { SaleState } from 'src/app/store/state/sale.state';
import { NameProductsSate } from 'src/app/store/state/name-products.state';
import { FormControl } from '@angular/forms';
import * as moment from 'moment'
import { mapTo, map, mergeScan, expand, mergeAll, takeWhile, switchMap, concatMap, tap, distinctUntilChanged, reduce, scan, shareReplay, share } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HistoryModalDialogComponent, HistoryDialogData } from './history-modal-dialog/history-modal-dialog.component';
import { HistoryService } from 'src/app/service/history.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HistoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'timestamp', 'discount'];
  displayedColumnsFooter: string[] = ['id', 'timestamp', "discount1", "discount"];
  dataSource;


  periods: string[] = [
    "За последнию неделю",
    "За последный месяц",
    "За последный год",
    "Другое"
  ];

  startPeriods = [
    moment().startOf('week').add(1, 'd'),
    moment().startOf('month'),
    moment().startOf('year'),
    moment()
  ]
  slectPeriod: number = 0;

  dates: moment.Moment[] = [];
  subDates: Subscription;

  dateFrom: FormControl = new FormControl(moment());
  dateTo: FormControl = new FormControl(moment());

  getTotalDiscount$ = of(300);
  constructor(
    private genereteService: GeneratorBase,
    private store: Store,
    public dialog: MatDialog,
    public historyService: HistoryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    moment.locale('ru');

    this.subDates = this.historyService.days()
      .subscribe(dates => this.dates = dates);

    this.dateFrom.valueChanges.subscribe(d => this.historyService.start = d);
    this.dateTo.valueChanges.subscribe(d => this.historyService.end = d);

    this.dateFrom.setValue(this.startPeriods[this.slectPeriod]);
    this.dateTo.setValue(moment());
  }
  ngAfterViewInit() {

  }

  openDialod() {
    let dialogRef = this.dialog.open(
      // this.modalDialogComponent
      HistoryModalDialogComponent, {
      minWidth: '300px',
      data: {
        periods: this.periods,
        select: this.slectPeriod
      },
      autoFocus: false
    });

    dialogRef.afterClosed().toPromise()
      .then(period => {
        if (period === undefined) return;
        this.slectPeriod = period;
        this.dateFrom.setValue(this.startPeriods[period]);
        this.dateTo.setValue(moment());
        this.cdr.detectChanges();
      })
  }

  sales;
  generete() {
    this.sales = this.genereteService.genereteSale(new Date(2020, 0, 1));
    return JSON.stringify(this.sales, null, 2);
  }


  spy(observable: Observable<any>): Observable<any> {

    return new Observable(obs => {
      console.log("subscription");
      let sub = observable.subscribe((v) => {
        console.log("source  emmit", v);
        obs.next(v);
      });

      return function unsubscribe() {
        console.log("unsubscribe");
        sub.unsubscribe()
      }
    })

  }
}
