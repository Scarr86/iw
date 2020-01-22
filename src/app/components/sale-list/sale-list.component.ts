import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, Subject, BehaviorSubject } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { SaleState } from 'src/app/store/state/sale.state';
import { Sale } from 'src/app/models/sale.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
})
export class SaleListComponent implements OnInit {
  // date: Date = new Date();
  date$: BehaviorSubject<Date>;


  //@Select(SaleState.getSaleByDate(new Date(2020, 0, 13))) 
  sales$: Observable<Sale[]>
  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit() {
    let dateStr = sessionStorage.getItem("sessionDate");
    let sessionDate = null;
    if (dateStr) {
      sessionDate = new Date(dateStr);
    }
    this.date$ = new BehaviorSubject(sessionDate || new Date())

    this.sales$ = this.date$.pipe(
      switchMap(d => this.store.select(SaleState.getSaleByDate(d)))
    )
  }
  onSelect(sale: Sale) {
    this.router.navigate(['/sale-detail', sale.id])
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    sessionStorage.setItem("sessionDate", event.value.toString());
    this.date$.next(event.value)
  }


  getNumProducts(sale: Sale): number {
    return sale.productList.length;
  }
  getTotalPrice(sale: Sale): number {
    return sale.productList.reduce((sum, p) => sum += p.count * p.price, 0) - sale.discount;
  }

}
