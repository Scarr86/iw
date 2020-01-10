import { Component, OnInit, DoCheck, AfterViewInit, ViewChild, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { Observable, merge } from "rxjs";
import { map, first } from "rxjs/operators";

import { File, Response } from "../../store/drive.store"
import { IBreadcrumbs, DriveStore } from 'src/app/store/drive.store';
import { LogService } from 'src/app/service/log.service';
import { FileService } from 'src/app/service/google-gapi/file.service';
import { FormControl, FormControlDirective, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-drive-viewer',
  templateUrl: './drive-viewer.component.html',
  styleUrls: ['./drive-viewer.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriveViewerComponent implements OnInit, DoCheck, AfterViewInit {

  @ViewChild("matListTemplate", { static: true }) matListTemplate: TemplateRef<any>;
  @ViewChild("fileTemplate", { static: true }) fileTemplate: TemplateRef<any>;

  pre$;
  breadcrumbs$: Observable<IBreadcrumbs>;
  list$: Observable<File[]>;
  file$: Observable<{name, text}>
  selectedFile: File = null;
  isNewFile: boolean = false;

  fcTextarea: FormControl = new FormControl('', Validators.required);
  fcInput: FormControl = new FormControl("", Validators.required);
  fg: FormGroup;

  constructor(
    // public auth: Auth2Service,
    // private drive: DriveService,
    // private zone: NgZone,
    private log: LogService,
    public driveStore: DriveStore,
    public fileService: FileService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.fg = formBuilder.group({
      name: ["1111", [Validators.required]],
      text: ["2222", [Validators.required]]
    })
  }

  ngOnInit() {

    this.pre$ = merge(this.driveStore.list$, this.driveStore.file$);
    this.list$ = this.driveStore.list$;
    this.breadcrumbs$ = this.driveStore.breadcrumbs$.pipe(map(bc => bc.length ? bc.slice(-1)[0] : { id: "root", name: "root" }));

    this.file$ = this.driveStore.file$.pipe(map(f=> ({
      name: f.result.name,
      text:f.body
    })));

    // this.fcTextarea.valueChanges.subscribe(()=>{
    //   console.log("CHANGE");
    //   // this.cdr.detectChanges()
    // })

  }
  ngAfterViewInit() {
    setTimeout(() => this.driveStore.list());
  }

  onSelected(file: File) {

    if (file.mimeType === "application/json") {
      this.isNewFile = true;
      this.selectedFile = file;
      this.driveStore.file(file.id);
    } else {
      this.driveStore.list({ id: file.id });
    }
  }

  onChange() {
  }
  ngDoCheck() {
  }

  onClick() {
    this.driveStore.list();

  }
  onDblClick(file: File) {

  }
  navigateTo() {
    if (this.isNewFile) {
      this.isNewFile = false;
      this.selectedFile = null;
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
  deleteFile(file: File) {
    this.driveStore.delete(file.id);
  }
  crateFolder() {
    this.driveStore.createFolder();
  }
  crateFile() {
    this.isNewFile = true;
    this.selectedFile = null;
    this.driveStore.fileNew();
    console.log(`select ${this.selectedFile} new file: ${this.isNewFile}`);
    // this.fcTextarea.valid;
  }
  saveFile() {
    console.log(`select ${this.selectedFile} new file: ${this.isNewFile}`);
    if (!this.selectedFile && this.isNewFile) {
      this.driveStore.createFile({
        name: this.fg.get('name').value,
        data: this.fg.get('text').value
      })
    } else {
      this.driveStore.file$.pipe(first()).subscribe((file: Response<File>) => {
        this.driveStore.updataFile({
          id: file.result.id,
          name: this.fg.get('name').value,
          data: this.fg.get('text').value
        })
      })
    }
    // if (!this.selectedFile && this.isNewFile) {
    //   this.driveStore.createFile({ name: this.fcInput.value, data: this.fcTextarea.value })
    // } else {
    //   this.file$.pipe(first()).subscribe((file: Response<File>) => {
    //     this.driveStore.updataFile({ id: file.result.id, name: this.fcInput.value, data: this.fcTextarea.value })
    //   })
    // }
  }

  loadTemplate() {
    if (this.isNewFile) {
      return this.fileTemplate;
    }
    return this.matListTemplate;
  }
}
