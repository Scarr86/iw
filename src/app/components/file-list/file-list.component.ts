import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../drive-viewer/modal-diolog/modal-diolog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  fileList = [
    "name1",
    "name2",
    "name3",
    "name4",
    "name5",
  ];
  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }
  select(i) {
    console.log(i);
    this.goBack();
  }

  create() {

    const dialogRef = this.dialog.open(
      ModalDialogComponent,
      {
        minWidth: '300px',
        data: {
          text: "",
          title: "Новая база"
        }
      }
    )
    dialogRef.afterClosed()
      .subscribe((result: string) => {
        console.log("result Doilog", result);
      })
  }
  goBack() {
    this.router.navigate(['/setting'])
  }
}
