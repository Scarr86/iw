import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Product } from 'src/app/service/sales';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
   @Input() product:Product;

  constructor( ) { 

    
  }

  ngOnInit() {
  }

}
