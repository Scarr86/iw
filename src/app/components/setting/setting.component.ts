import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalDialogComponent } from '../drive-viewer/modal-diolog/modal-diolog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  name = "name";
  size = "100KB"
  dateCreate = new Date(2015, 1, 1);
  dateChange = new Date();
  id = "adfsdfsdf123123";
 
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onChange(){
    this.router.navigate(['/file-list'])
  }
 
}
