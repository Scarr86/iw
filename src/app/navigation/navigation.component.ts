import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Auth2Service } from '../service/google-gapi/auth2.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from '../service/theme.service';

@Component({
   selector: 'app-navigation',
   templateUrl: './navigation.component.html',
   styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

   isSignedIn$: Observable<boolean>;

   @HostBinding('class') componentCssClass;

   links = [
      { name: "Sale", patch: "/sale-list" },
      { name: "History", patch: "/history" },
      { name: "Setting", patch: "/setting" }
   ];

   // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
   //    .pipe(
   //       tap(r => console.log(r)),
   //       map(result => result.matches),
   //       shareReplay()
   //    );

   //  isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');

   constructor(private breakpointObserver: BreakpointObserver, private auth: Auth2Service, public overlayContainer: OverlayContainer,
      private theme: ThemeService
   ) {

}

ngOnInit() {
   this.isSignedIn$ = this.auth.isSignedIn;
   // this.componentCssClass = 'dark-theme';
   this.theme.isDarkTheme.subscribe(console.log)
}


cbChange(checked: boolean) {
   this.theme.setDarkTheme(checked);
}

signIn() {
   this.auth.signIn();
}
signOut() {
   this.auth.signOut();
}
}
