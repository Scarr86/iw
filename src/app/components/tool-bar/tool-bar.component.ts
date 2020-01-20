import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  @Input() title ="";
  @Input() btnText="";
  @Output() btnClick= new EventEmitter<any>();
  @Output() arrowClick= new EventEmitter<any>();
   constructor() { }

  ngOnInit() {

  }
  onClick(){
    this.btnClick.emit();
  }
  onBack(){
    this.arrowClick.emit();
  }
}
