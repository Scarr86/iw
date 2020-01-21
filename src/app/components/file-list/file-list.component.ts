import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../drive-viewer/modal-diolog/modal-diolog.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FileState } from '../../store/state/file.state';
import { File } from '../../models/file.model';
import { Store, Select, Actions, ofActionCanceled, ofActionErrored, ofActionCompleted, ofActionSuccessful } from '@ngxs/store';
import { GetFileList, GetFile, CreateFile, DeleteFile, UpdateFile, GetBodyFile } from 'src/app/store/actions/file.actions';

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
  @Select(FileState.list) files$: Observable<File[]>;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store,
    private actions$: Actions
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetFileList());

    // this.action$.pipe(ofActionCanceled(GetList)).subscribe(()=> alert("GetList Canceled"))
    // this.action$.pipe(ofActionErrored(GetList)).subscribe(()=> alert("GetList Errored"))
    // this.action$.pipe(ofActionCompleted(GetList)).subscribe((r)=> alert(`GetList ${JSON.stringify(r)}` ))
  }
  select(file: File) {
    this.store.dispatch(new GetFile(file.id));
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
        if (result) {
          this.store.dispatch(new CreateFile(result, {
            a: 1,
            b: 2,
            c: 1,
          }))
            .subscribe(r => console.log("Create ready"));
        }
      })
  }
  goBack() {
    this.router.navigate(['/setting'])
  }
  delete(ev, file: File) {
    ev.stopPropagation();
    this.store.dispatch(new DeleteFile(file.id))
  }
  update(ev, file: File) {
    ev.stopPropagation();
    this.store.dispatch(new UpdateFile(file.id, "update name", {}))
  }
  getBodyFile(ev, file: File) {
    ev.stopPropagation();
    this.store.dispatch(new GetBodyFile(file.id)).subscribe(res => console.log(res))
  }
}
