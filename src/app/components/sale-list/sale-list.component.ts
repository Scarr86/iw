import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, Subject } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { SaleState } from 'src/app/store/state/sale.state';
import { Sale } from 'src/app/models/sale.model';



@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
})
export class SaleListComponent implements OnInit {
  date: Date = new Date();
  date$:Subject<Date> = new Subject();


  @Select(SaleState.getSaleByDate(new Date(2020, 0, 13))) sales$: Observable<Sale[]>
  constructor(private store: Store) { }
  ngOnInit() {
    this.sales$.subscribe((s) => console.log(s))
  }
  onSelect() {

  }
}
