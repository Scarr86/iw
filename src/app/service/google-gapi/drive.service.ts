import { Injectable, NgZone } from "@angular/core";
import { Auth2Service } from "./auth2.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DriveService {
  constructor(private auth: Auth2Service, private zone: NgZone) {}

  list() {
    return new Observable<gapi.client.Response<gapi.client.drive.FileList>>(
      obs => {
        this.zone.run(() => {
          gapi.client.drive.files
            .list({
              pageSize: 10,
              fields: "nextPageToken, files(id, name)",
              spaces: "drive"
            })
            .then(
              (response: gapi.client.Response<gapi.client.drive.FileList>) => {
                obs.next(response);
                obs.complete();
              },
              err => {
                obs.error(err);
              }
            );
        });
      }
    );
  }
}
