import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Observable, Subscriber, Subject, BehaviorSubject } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { SaleState } from 'src/app/store/state/sale.state';
import { Sale } from 'src/app/models/sale.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { switchMap, tap, shareReplay, share, buffer, bufferCount, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DeleteSale } from 'src/app/store/actions/sale.actions';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl } from '@angular/forms';






@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
})
export class SaleListComponent implements OnInit, AfterViewInit {
  // date: Date = new Date();
  // date$: BehaviorSubject<Date>;
  date: FormControl = new FormControl(new Date());


  //@Select(SaleState.getSaleByDate(new Date(2020, 0, 13))) 
  sales$: Observable<Sale[]>
  constructor(
    private store: Store,
    private router: Router
  ) { }
  ngAfterViewInit() {
    let sessionDate = sessionStorage.getItem("sessionDate");
    this.date.setValue(sessionDate ? new Date(sessionDate) : new Date());
  }

  ngOnInit() {
    this.sales$ = this.date.valueChanges.pipe(
      delay(1),
      tap(d => sessionStorage.setItem("sessionDate", d.toString())),
      switchMap(d => this.store.select(SaleState.getSaleByDate(d))),
    ); 
  }
  onSelect(sale: Sale) {
    this.router.navigate(['/sale-detail', sale.id])
  }

  // onDateChange(event: MatDatepickerInputEvent<Date>) {
  //   sessionStorage.setItem("sessionDate", event.value.toString());
  //   this.date$.next(event.value)
  // }


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
