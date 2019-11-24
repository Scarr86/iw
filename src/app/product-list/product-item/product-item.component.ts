import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/service/sale.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
   @Input() product:Product;
  constructor() { }

  ngOnInit() {
  }

}
