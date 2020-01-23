import { Component, OnInit } from '@angular/core';
import { GeneratorBase } from '../../service/generator-sale.service';
import { from, of } from 'rxjs';

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
    this.sales = this.genereteService.genereteSale(new Date(2020, 0, 1));
  }
}
