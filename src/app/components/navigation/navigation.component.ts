import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Auth2Service } from '../../service/google-gapi/auth2.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from '../../service/theme.service';
import { Select, Store, Actions, ofActionErrored, ofActionCompleted } from '@ngxs/store';
import { GapiState } from 'src/app/store/state/gapi.state';
import { SignIn, SignOut } from 'src/app/store/actions/auth2.actions';

@Component({
   selector: 'app-navigation',
   templateUrl: './navigation.component.html',
   styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

   @Select(GapiState.isSignedIn) isSignedIn$: Observable<boolean>;

   @HostBinding('class') componentCssClass;

   links = [
      { name: "Sale", patch: "/sale-list" },
      { name: "History", patch: "/history" },
      { name: "Setting", patch: "/setting" }
   ];

   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
         map(result => result.matches),
         shareReplay()
      );

   //  isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');

   constructor(
      private breakpointObserver: BreakpointObserver,
      // private auth: Auth2Service,
      //public overlayContainer: OverlayContainer,
      private theme: ThemeService,
      private store: Store,
      private actions$:Actions
   ) {

   }

   ngOnInit() {
      //this.isSignedIn$ = this.auth.isSignedIn;
      // this.componentCssClass = 'dark-theme';
      // this.theme.isDarkTheme.subscribe((r) => console.log("isDarkTheme", r))
   }


   cbChange(checked: boolean) {
      this.theme.setDarkTheme(checked);
      //this.componentCssClass = checked ? "dark-theme" : "";
   }

   signIn() {
      this.store.dispatch(new SignIn())
      // this.auth.signIn();
   }
   signOut() {
      this.store.dispatch(new SignOut())

      // this.auth.signOut();
   }
   swappingTheme(theme) {
      // document.getElementById('themeAsset').href = `assest/${theme}`
   }
}
