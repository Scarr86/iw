import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { publishReplay, refCount, delay, finalize, shareReplay, multicast, publish } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkTheme = new BehaviorSubject<boolean>(false);
  get isDarkTheme() {

    return this._darkTheme.asObservable();
    // .pipe(
    //   publishReplay(1),
    //   refCount()
    // )
  }
  constructor() {
    console.log(this);
    
   }

  setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme);
  }
}
