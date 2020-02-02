import { Component, OnInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscriber, Subject, BehaviorSubject } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { SaleState } from 'src/app/store/state/sale.state';
import { Sale } from 'src/app/models/sale.model';
import { switchMap, tap, shareReplay, share, buffer, bufferCount, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DeleteSale } from 'src/app/store/actions/sale.actions';
import { FormControl } from '@angular/forms';

import * as moment from "moment";

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaleListComponent implements OnInit, AfterViewInit {

  @Select(SaleState.loading) loading$: Observable<boolean>;
  date: FormControl = new FormControl(new Date());
  sales$: Observable<Sale[]>;
  isSameDate: boolean;
  descriptionDate: string;


  constructor(
    private store: Store,
    private router: Router,
    // public sls: StateLoadingService,
  ) { }


  ngOnInit() {
    moment.locale('ru')
    this.sales$ = this.date.valueChanges.pipe(
      delay(0),
      tap(d => {
        this.isSameDate = !moment(d).isSame(moment(), 'day');
        this.descriptionDate = this.isSameDate ? moment(d).endOf('day').fromNow() : "Сегодня" ;
        sessionStorage.setItem("sessionDate", d)
      }),
      switchMap(d => this.store.select(SaleState.getSaleByDate(moment(d)))),
    );
  }
  ngAfterViewInit() {
    let sessionDate = sessionStorage.getItem("sessionDate");
    this.date.setValue(sessionDate ? new Date(sessionDate) : new Date());
  }

  onSelect(id: any, indx: number) {
    this.router.navigate(['/sale-detail', indx], {
      queryParams: { id }
    });
  }
  addSale() {
    this.router.navigate(['/sale-detail', 'newsale']);
  }
  getNumProducts(sale: Sale): number {
    return sale.productList.length;
  }
  getTotalPrice(sale: Sale): number {
    return sale.productList.reduce((sum, p) => sum += p.count * p.price, 0) - sale.discount;
  }
  onDelete(s: Sale) {
    this.store.dispatch(new DeleteSale(s.id));
  }

}
