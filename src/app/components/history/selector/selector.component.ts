import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment'
@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  dateFrom: FormControl = new FormControl(moment());
  dateTo: FormControl = new FormControl(moment());
  constructor() { }

  ngOnInit() {
  }

}
