import { Component, OnInit } from '@angular/core';
import { GeneratorBase } from '../../service/generator-sale.service';
import { from, of } from 'rxjs';
import { Sale } from 'src/app/models/sale.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  sales;
  constructor(private genereteService: GeneratorBase ) { }

  ngOnInit() {
  }
  generete() {
    console.dir(Sale);
     this.sales = this.genereteService.genereteSale(new Date(2020, 0, 1));
     return  JSON.stringify(this.sales, null, 2);
  }
}
