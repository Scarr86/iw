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
import { MatDialog } from '@angular/material/dialog';
import { HistoryModalDialogComponent } from './history-modal-dialog/history-modal-dialog.component';

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

})
export class HistoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'timestamp', 'discount'];
  displayedColumnsFooter: string[] = ['id', 'timestamp', "discount1", "discount"];
  dataSource;


  @Select(NameProductsSate.names) names$;

  dateFrom: FormControl = new FormControl();
  dateTo: FormControl = new FormControl();
  range$: Observable<Sale[]>;
  getTotalDiscount$;
  sales;
  constructor(
    private genereteService: GeneratorBase,
    private store: Store,
    public dialog: MatDialog
  ) { }




  ngOnInit() {
    moment.locale('ru');

    this.range$ = combineLatest(
      this.dateFrom.valueChanges.pipe(distinctUntilChanged()),
      this.dateTo.valueChanges.pipe(distinctUntilChanged())
    ).pipe(
      switchMap(([start, end]) => this.store.selectOnce(SaleState.getSaleByDateBetween(start, end))),
      map((s: Sale[]) => s.sort((s1, s2) => moment(s1.timestamp).isAfter(moment(s2.timestamp)) ? 1 : -1)),
      // map((s:Sale[])=> s.map(s=> ({...s, timestamp: moment(s.timestamp).format("DD-MM-YYYY") }))),
      shareReplay(1)
    );

    this.getTotalDiscount$ = of(0)
    // this.range$.pipe(
    // scan((total, s)=> s.() , 0)
    // )

    this.dataSource = this.range$;

    this.range$.subscribe((s) => console.log(s));

    // console.log(moment([2020, 0, 1]), moment([2020, 0, 8]));

    this.dateFrom.setValue(moment([2020, 0, 1]))
    this.dateTo.setValue(moment([2020, 0, 8]));
  }
  ngAfterViewInit() {


  }

  openDialod() {
    const dialogRef = this.dialog.open(
      // this.modalDialogComponent
      HistoryModalDialogComponent, {
      minWidth: '200px',
      data: {
        select: 2
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(period => {
      console.log(period);
    })

  }

  generete() {
    this.sales = this.genereteService.genereteSale(new Date(2020, 0, 1));
    return JSON.stringify(this.sales, null, 2);
  }
}
