import { Component, OnInit } from '@angular/core';
import { GeneratorBase } from '../../service/generator-sale.service';
import { from, of } from 'rxjs';
import { Sale } from 'src/app/models/sale.model';
import { Select } from '@ngxs/store';
import { SaleState } from 'src/app/store/state/sale.state';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Select(SaleState.nameProduct) name$;

  sales;
  constructor(private genereteService: GeneratorBase ) { }

  ngOnInit() {
  }
  generete() {
    
     this.sales = this.genereteService.genereteSale(new Date(2020, 0, 1));
     return  JSON.stringify(this.sales, null, 2);
  }
}
