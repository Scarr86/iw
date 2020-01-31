import { Component, OnInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
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
import { StateLoadingService } from 'src/app/service/state-loading.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaleListComponent implements OnInit, AfterViewInit {
  date: FormControl = new FormControl(new Date());
  sales$: Observable<Sale[]>
  constructor(
    private store: Store,
    private router: Router,
    public sls: StateLoadingService,
  ) { }


  ngOnInit() {
    this.sales$ = this.date.valueChanges.pipe(
      delay(0),
      tap(d => sessionStorage.setItem("sessionDate", d.toString())),
      switchMap(d => this.store.select(SaleState.getSaleByDate(d))),
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
