import { Component, OnInit, NgZone } from "@angular/core";
import { Auth2Service } from "../service/google-gapi/auth2.service";
import { Observable } from "rxjs";
import { DriveService } from "../service/google-gapi/drive.service";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.scss"]
})
export class SettingComponent implements OnInit {
  $isSignedIn: Observable<boolean>;
  list;
  constructor(
    public auth: Auth2Service,
    private drive: DriveService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.$isSignedIn = this.auth.isSignedIn;
  }
  signIn() {
    this.auth.signIn();
  }
  signOut() {
    this.auth.signOut();
  }
  getList() {
    this.zone.run(() => {
      this.drive.list().subscribe(res => {
        this.list = res;
      });
    });
  }
}
