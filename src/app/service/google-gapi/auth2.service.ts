import { Injectable, NgZone } from "@angular/core";
import { LogService } from "../log.service";
import { Observable, Subject, BehaviorSubject, ReplaySubject } from "rxjs";

const API_KEY: string = "AIzaSyCofOM8sRo0bZRPxjnZxabuOtjuK6xN48o";
const CLIENT_ID: string =
  "843806706192-trsuvvlpi50vohsul3imgjl20o7fnbuo.apps.googleusercontent.com";
const DISCOVERY_DOCS: string[] = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
];
const SCOPES: string = "https://www.googleapis.com/auth/drive";

@Injectable({
  providedIn: "root"
})
export class Auth2Service {
  private isSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private gapiReady$: ReplaySubject<boolean> = new ReplaySubject(1);
  get isGapiRady() {
    return this.gapiReady$.asObservable();
  }

  get isSignedIn(): Observable<boolean> {
    return this.isSignedIn$.asObservable();
  }

  private googleAuth: gapi.auth2.GoogleAuth;
  private googleUser: gapi.auth2.GoogleUser;
  gapiLoaded = false;
  gapiReady = false;



  constructor(private log: LogService, private zone: NgZone) {



  }

  initGapi() {
    return this.loadClient()
      .then(() => {
        this.log.write("Auth2Service: LOAD");
        // this.gapiLoaded = true;
        return this.initClient();
      },
        err => {
          throw new Error(`LOAD FAILED ${err}`);
        }
      ).then(() => {
        this.googleAuth = gapi.auth2.getAuthInstance();
        this.isSignedIn$.next(this.googleAuth.isSignedIn.get());
        this.googleAuth.isSignedIn.listen(this.updateSigninStatus.bind(this));
        this.gapiReady = true;
        this.log.write(`Auth2Service: INIT CLIENT GAPI `);
        // this.gapiReady$.next(true);
        // this.gapiReady$.complete();
      },
        err => {
          throw new Error(`Auth2Service ${err}`);
        }
      )

  }




  private loadClient(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        gapi.load("client:auth2", {
          callback: resolve,
          onerror: reject,
          timeout: 1000, // 5 seconds.
          ontimeout: reject
        });
      });
    });
  }
  private initClient(): Promise<any> {
    let initObj = {
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    };

    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        gapi.client.init(initObj).then(resolve, reject);
      });
    });
  }
  private updateSigninStatus(isSigninStatus: boolean) {
    this.zone.run(() => {
      this.isSignedIn$.next(isSigninStatus);
    });
  }

  signIn() {
    this.googleAuth
      .signIn({ prompt: "select_account" })
      .catch(err =>
        this.log.write(`Auth2Service: signIn  failed ${JSON.stringify(err)}`, "warn")
      );
  }
  signOut() {
    this.googleAuth.signOut();
  }
}
