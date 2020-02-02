import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GeneratorBase } from '../../service/generator-sale.service';
import { from, of, Observable, combineLatest, range } from 'rxjs';
import { Sale } from 'src/app/models/sale.model';
import { Select, Store } from '@ngxs/store';
import { SaleState } from 'src/app/store/state/sale.state';
import { NameProductsSate } from 'src/app/store/state/name-products.state';
import { FormControl } from '@angular/forms';
import * as moment from 'moment'
import { mapTo, map, mergeScan, expand } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent implements OnInit {
  @Select(NameProductsSate.names) names$;

  dateFrom: FormControl = new FormControl();
  dateTo: FormControl = new FormControl();
  get minDate() {
    return new Date(this.dateFrom.value)
  }
  get maxDate() {
    return new Date(this.dateTo.value)
  }
  range$: Observable<any>
  sales;
  constructor(private genereteService: GeneratorBase,
    private store: Store) { }

  ngOnInit() {
    this.range$ = combineLatest(this.dateFrom.valueChanges, this.dateTo.valueChanges)
      .pipe(
        map(([from, to]) => [moment(from), moment(to)]),
        map(([from, to]) => [from.format("DD-MM-YYYY"), to.format("DD-MM-YYYY")])
      )
    this.range$.subscribe(console.log)

    // this.range$.subscribe(([from, to]) => console.log(`from: ${from.format("DD-MM-YYYY")}\nto: ${to.format("DD-MM-YYYY")}`));



    this.dateTo.setValue(moment().add(1, 'd').toDate())
    this.dateFrom.setValue(moment().subtract(1, 'd').toDate())

  }
  generete() {

    this.sales = this.genereteService.genereteSale(new Date(2020, 0, 1));
    return JSON.stringify(this.sales, null, 2);
  }
}
