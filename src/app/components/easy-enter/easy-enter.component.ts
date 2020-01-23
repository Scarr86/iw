import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-easy-enter',
  templateUrl: './easy-enter.component.html',
  styleUrls: ['./easy-enter.component.scss']
})
export class EasyEnterComponent implements OnInit {
  value = 55;
  @Output() change = new EventEmitter();
  @Input() source: FormControl;
  @Input() type: string;
  @Input() placeholder:String;


  constructor() { }

  ngOnInit() {
    console.log(this.source);
    
  }
  clear() {
    this.source.setValue("");
  }
  set(v:number){
    this.source.setValue(+this.source.value + v);
  }

}
