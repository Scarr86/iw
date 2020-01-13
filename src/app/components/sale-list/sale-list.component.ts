import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SaleStore } from 'src/app/store/sale.store';
import { SaleEffect } from 'src/app/store/effects/sale.effects';
import { LogService } from 'src/app/service/log.service';
import { Actions } from 'src/app/store/actions/actions';
import { isArray } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
  providers: [LogService]
})
export class SaleListComponent implements OnInit, AfterViewInit {
  sales$ = this.saleStore.saleList$;
  date: Date = new Date();
  constructor(public saleStore: SaleStore, private router: Router, ) { }

  ngOnInit() {
    // this.saleStore.saleList$.subscribe((r) => {
    //   console.log("Sale list: ", r, isArray(r) && r[0]);

    // })

  }
  ngAfterViewInit() {
    this.saleStore.getSeleList();
  }

  getSaleList() {
    this.saleStore.getSeleList();
  }
  setDate(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
  }
  goToProductList(i: number) {
    this.router.navigate(
      ['product-list', i.toString()],
      {
        queryParams: {
          "date": this.date.getTime()
        }
      }
    )
  }

}
