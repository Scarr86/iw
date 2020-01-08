import { Injectable, NgZone } from "@angular/core";
import { Auth2Service } from "./google-gapi/auth2.service";
import { Observable, from, of, Subject, concat } from "rxjs";
import { delay, concatMap, switchMap, tap } from "rxjs/operators";
import { LogService } from './log.service';

@Injectable({
  providedIn: "root"
})
export class DriveService {


  constructor(private auth: Auth2Service, private zone: NgZone, private logger: LogService) { }

  list(folderId = 'root') {
    return this.auth.isGapiRady.pipe(
      switchMap(_ => this._list(folderId)),
      tap(_=>this.log(`list folder id: ${folderId}`))
    );
  }

  _list(folderId = 'root'){
    return from(new Promise<gapi.client.Response<gapi.client.drive.FileList>>((resolve, reject) => {
      gapi.client.drive.files.list({
        pageSize: 1000,
        fields: "nextPageToken, files(id, name,iconLink, size, mimeType, parents, modifiedByMeTime)",
        q: `'${folderId}' in parents and trashed = false`,
        spaces: "drive",
        orderBy: 'createdTime desc'
      })
        .then(resolve, reject);
    }))
  }

  listFolders(folderId) {
    return this.auth.isGapiRady.pipe(
      switchMap(_ => this._listFolders(folderId))
    );
  }
  private _listFolders(folderId = 'root') {
    return from(new Promise<gapi.client.Response<gapi.client.drive.FileList>>((resolve, reject) => {
      gapi.client.drive.files.list({
        pageSize: 1000,
        q: `'${folderId}' in parents and  mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: "nextPageToken,  files(id, name, parents, modifiedByMeTime)",
        orderBy: 'createdTime desc',

      })
        .then(resolve, reject);
    }));
  }

  log(msg){
    this.logger.write(`DriveServise: ${msg}`)
  }
}
