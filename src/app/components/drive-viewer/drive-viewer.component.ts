import { Component, OnInit, DoCheck, AfterViewInit, ViewChild, TemplateRef, ChangeDetectorRef } from "@angular/core";
import { Observable, merge } from "rxjs";
import { map, first } from "rxjs/operators";

import { File, Response } from "../../store/drive.store"
import { IBreadcrumbs, DriveStore } from 'src/app/store/drive.store';
import { LogService } from 'src/app/service/log.service';
import { FileService } from 'src/app/service/google-gapi/file.service';
import { FormControl, FormControlDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-drive-viewer',
  templateUrl: './drive-viewer.component.html',
  styleUrls: ['./drive-viewer.component.scss']
})
export class DriveViewerComponent implements OnInit, DoCheck, AfterViewInit {

  @ViewChild("matListTemplate", { static: true }) matListTemplate: TemplateRef<any>;
  @ViewChild("fileTemplate", { static: true }) fileTemplate: TemplateRef<any>;

  pre$;
  breadcrumbs$: Observable<IBreadcrumbs>;
  list$: Observable<File[]>;
  file$: Observable<Response<File>>
  selectedFile: File = null;
  isNewFile: boolean = false;

  fcTextarea: FormControl = new FormControl('', Validators.required);
  fcInput: FormControl = new FormControl("", Validators.required);

  constructor(
    // public auth: Auth2Service,
    // private drive: DriveService,
    // private zone: NgZone,
    private log: LogService,
    public driveStore: DriveStore,
    public fileService: FileService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.pre$ = merge(this.driveStore.list$);
    this.list$ = this.driveStore.list$;
    this.breadcrumbs$ = this.driveStore.breadcrumbs$.pipe(map(bc => bc.length ? bc.slice(-1)[0] : { id: "root", name: "root" }));
    // console.log(this.fcTextarea);

    this.file$ = this.driveStore.file$;

    // this.fcTextarea.valueChanges.subscribe(()=>{
    //   // this.cdr.detectChanges()
    // })

  }
  ngAfterViewInit() {
    // this.driveStore.list()
    setTimeout(() => this.driveStore.list());
  }

  onSelected(file: File) {
    // if(file.mimeType === "application/json"){
    //   this.driveStore.file(file.id);
    // }

    this.selectedFile = file === this.selectedFile ? null : file;
  }

  onChange() {
  }
  ngDoCheck() {
  }

  onClick() {
    this.driveStore.list();

  }
  onDblClick(file: File) {
    if (file.mimeType === "application/json") {
      this.isNewFile = true;
      this.driveStore.file(file.id);
    } else {
      this.driveStore.list({ id: file.id });
    }
  }
  navigateTo() {
    if (this.isNewFile) {
      this.isNewFile = false;
      this.breadcrumbs$.pipe(first()).subscribe(bc => {
        this.driveStore.list({ id: bc.id });
      })
    } else {
      this.driveStore.navigateTo();
    }
  }

  getFile() {
    this.driveStore.file("1_K6xMleGXyF1qVwQvryEMoUVtSR3IbWJ");
  }
  getList(file: File = { id: "root" }) {
    this.driveStore.list({ id: file.id });
  }
  deleteFile() {

    this.driveStore.delete(this.selectedFile.id);
    this.selectedFile = null;
  }


  crateFolder() {
    this.driveStore.createFolder();
  }
  crateFile() {
    this.fcInput.reset();
    this.fcTextarea.reset();
    this.isNewFile = true;
  }
  saveFile() {
    if (this.isNewFile) {
      this.driveStore.createFile({ name: this.fcInput.value, data: this.fcTextarea.value })
    } else {
      this.file$.subscribe((file: Response<File>) => {
        this.driveStore.updataFile({ id: file.result.id, name: this.fcInput.value, data: this.fcTextarea.value })
      })
    }
  }

  loadTemplate() {
    if (this.isNewFile) {
      return this.fileTemplate;
    }
    return this.matListTemplate;
  }
}
