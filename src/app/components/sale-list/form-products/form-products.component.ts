import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormProductsComponent implements OnInit {
  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }
  get name() {
    return this.formGroup.get('name')
  }
  get count() {
    return this.formGroup.get('count')
  }
  get price() {
    return this.formGroup.get('price')
  }
  onChange(ctr: FormControl, value) {
    ctr.setValue(+ctr.value + value)
  }
  clear(ctr: FormControl) {
    ctr.reset();
  }

  handleInput(ev:Event){
    console.log(ev.code)
  }


}
