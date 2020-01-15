import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-easy-enter',
  templateUrl: './easy-enter.component.html',
  styleUrls: ['./easy-enter.component.scss']
})
export class EasyEnterComponent implements OnInit {
  value;
  @Output() change = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }
  onChange(value) {
    this.change.emit(value);
  }

}
