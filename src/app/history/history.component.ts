import { Component, OnInit } from '@angular/core';
import { GeneratorBase } from '../service/generator-sale.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

   sales$;
  constructor(private genereteService: GeneratorBase) { }

  ngOnInit() {
  }
  generete(){
   //   this.sales$ = this.genereteService.genereteSale();
   let sub= this.genereteService.genereteSale().subscribe(console.log);
   
   setTimeout(()=>{
      console.log("unsub");
      sub.unsubscribe();
   }, 1500)
  }
}
