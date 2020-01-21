import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ISale } from 'src/app/models/old-sale.model';

@Component({
   selector: 'app-sale-item',
   templateUrl: './sale-item.component.html',
   styleUrls: ['./sale-item.component.scss']
})
export class SaleItemComponent implements OnInit {
   @Input() sale: ISale;
   constructor() { }

   ngOnInit() {
   }
   getNumProducts(): number {
      if (!this.sale) return 0;
      return this.sale.productList.length;
   }
   getTotalPrice() {
      if (!this.sale) return 0;
      return this.sale.productList.reduce((sum, p) => sum += p.count * p.price, 0) - this.sale.discount;
   }

}
