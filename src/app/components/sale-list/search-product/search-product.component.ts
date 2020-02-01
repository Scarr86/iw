import { Component, OnInit } from '@angular/core';
import { Store,  Select } from '@ngxs/store';
import { SaleState } from 'src/app/store/state/sale.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {

  @Select(SaleState.nameProduct) nameProduct$:Observable<string[]>
  constructor(private store:Store) { }

  ngOnInit() {
  }

}
