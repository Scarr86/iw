import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { SaleStore } from 'src/app/store/old-sale.store';

@Component({
  templateUrl: './sale-list-container.component.html',
  styleUrls: ['./sale-list-container.component.scss']
})
export class SaleListContainerComponent implements OnInit {
  date: Date = new Date()

  constructor(private router: Router, public saleStore: SaleStore) {

  }
  sales$ = this.saleStore.selectSaleList();
  loading$ = this.saleStore.selectIsLoading();

  ngOnInit() {
  }

  goToProductList(id: number) {
    this.router.navigate(
      ['product-list', id],
    )
  }

  delete(id: number) {

  }
  onDate(date: Date) {
    console.log(date);
    

  }

}
