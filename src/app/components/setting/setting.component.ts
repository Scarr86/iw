import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalDialogComponent } from '../drive-viewer/modal-diolog/modal-diolog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, Actions, ofActionSuccessful, Select } from '@ngxs/store';
import { GetFileList, GetFile } from 'src/app/store/actions/file.actions';
import {File} from '../../models/file.model';
import { FileState } from 'src/app/store/state/file.state';
import { Observable } from 'rxjs';
import { SaleState } from 'src/app/store/state/sale.state';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  @Select(SaleState.baseInfo) baseInfo$: Observable<File>;

  constructor(
    private router: Router,
    private store: Store,
    private actions$: Actions,
  ) { }

  ngOnInit() {
    // this.store.dispatch(new GetFile("1KMrG-wt5syMh1o0TkYg_TSpXtPfiJjs9"));
    // this.actions$.pipe(ofActionSuccessful(GetList)).subscribe(()=> this.router.navigate(['/file-list']))
  }

  onChange() {
    // this.store.dispatch(new GetList()).subscribe(res=> console.log("[Gelt LIst ]", res));
    this.router.navigate(['/file-list']);
  }

}
