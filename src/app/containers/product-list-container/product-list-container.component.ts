import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ISale } from 'src/app/models/sale.model';
import { SaleStore } from 'src/app/store/sale.store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list-container',
  templateUrl: './product-list-container.component.html',
  styleUrls: ['./product-list-container.component.scss']
})
export class ProductListContainerComponent implements OnInit {

  sale$: Observable<ISale>;
  loading$: Observable<boolean>;
  id: number;
  constructor(private activeRoute: ActivatedRoute, private router:Router, private saleStore: SaleStore) { }

  ngOnInit() {
    this.id = +this.activeRoute.snapshot.params['id'];
    this.sale$ = this.saleStore.selectSaleList().pipe(map(sales => sales && sales.find(s => s.id === this.id)));
    this.loading$ = this.saleStore.selectIsLoading();
  }
  save(ev){
    console.log("SAVE",ev);
  }

  goSaleList() {
    this.router.navigate(['sale-list'])
  }

}
