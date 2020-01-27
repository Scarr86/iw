import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { GapiState } from '../store/state/auth.state';
import { tap, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private store: Store) { }
  @Select(GapiState.isSignedIn) isSignedIn$: Observable<boolean>;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isSignedIn = this.store.selectSnapshot(GapiState.isSignedIn);
    if (!isSignedIn) {
      this.router.navigate(['/login']);
      return false;
    } 
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("canActivateChild");
    console.log(state.url);
    // if (state.url === '/login') {
    //   return true
    // }
    // if (true) {
    //   this.router.navigate(['/login']);
    // }
    return true;
  }

}
