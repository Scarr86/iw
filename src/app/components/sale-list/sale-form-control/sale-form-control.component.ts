import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sale-form-control',
  templateUrl: './sale-form-control.component.html',
  styleUrls: ['./sale-form-control.component.scss']
})
export class SaleFormControlComponent implements OnInit {

  @Output() change = new EventEmitter();
  @Input() source: FormControl;
  @Input() type: string;
  @Input() placeholder: String;


  constructor() { }

  ngOnInit() {


  }
  clear() {
    let newVal: number | string;
    if (this.type == 'text')
      newVal = "";
    else
      newVal = 0;
    this.source.setValue(newVal, {
      // onlySelf: true,
      // emitEvent: false
    });
    this.source.markAsTouched();
  }
  set(v: number) {
    this.source.setValue(+this.source.value + v);
    this.source.markAsTouched();

  }

}
