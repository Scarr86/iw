import { Component, OnInit, Input } from '@angular/core';
import { Sale } from 'src/app/service/sales';

@Component({
   selector: 'app-sale-item',
   templateUrl: './sale-item.component.html',
   styleUrls: ['./sale-item.component.scss']
})
export class SaleItemComponent implements OnInit {
   @Input() sale: Sale;
   constructor() { }

   ngOnInit() {

   }
   getNumProducts(): number {
      if (!this.sale) return 0;
      return this.sale.productList.length;
   }
   getTotalPrice() {
      if (!this.sale) return 0;
      return this.sale.productList.reduce((sum, p) => sum += p.num * p.price - p.discount, 0)
   }

}
