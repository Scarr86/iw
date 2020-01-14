import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SaleStore } from './store/sale.store';
import { DriveStore } from './store/drive.store';
import { merge } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  loading$

  title = 'iw';
  constructor(private saleStory:SaleStore, private driveStore: DriveStore){
      this.loading$ = merge(this.saleStory.selectIsLoading(), this.driveStore.loading$);
  }
}
