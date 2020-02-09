import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import * as moment from "moment";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {
  HistoryModalDialogComponent,
  HistoryDialogData
} from "../history-modal-dialog/history-modal-dialog.component";
import { HistoryService } from "src/app/service/history.service";
import { Store, Select } from "@ngxs/store";
import { HistorySatate } from "src/app/store/state/history.state";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { SetHistory } from "src/app/store/actions/history.action";
@Component({
  selector: "app-selector",
  templateUrl: "./selector.component.html",
  styleUrls: ["./selector.component.scss"]
})
export class SelectorComponent implements OnInit, OnDestroy {
  dateFrom: FormControl = new FormControl(moment());
  dateTo: FormControl = new FormControl(moment());

  constructor(public dialog: MatDialog, public store: Store) {}

  ngOnInit() {}
  ngOnDestroy() {}

  openDialod() {
    let dialogRef = this.dialog.open(HistoryModalDialogComponent, {
      minWidth: "300px",
      data: {
        period: this.store.selectSnapshot(
          HistorySatate.getValue("dialogPeriod")
        ),
        select: this.store.selectSnapshot(
          HistorySatate.getValue("selectPeriod")
        )
      },
      autoFocus: false
    });

    dialogRef
      .afterClosed()
      .toPromise()
      .then(select => {
        this.store.dispatch(new SetHistory("selectPeriod", select));
      });
  }
}
