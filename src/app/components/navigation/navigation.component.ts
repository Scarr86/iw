import { Component, OnInit, HostBinding, AfterViewInit, AfterContentInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap, startWith, filter } from 'rxjs/operators';
import { Auth2Service } from '../../service/google-gapi/auth2.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from '../../service/theme.service';
import { Select, Store, Actions, ofActionErrored, ofActionCompleted } from '@ngxs/store';
import { GapiState } from 'src/app/store/state/gapi.state';
import { SignIn, SignOut } from 'src/app/store/actions/auth2.actions';
import { StateLoadingService } from 'src/app/service/state-loading.service';
import { SaleState } from 'src/app/store/state/sale.state';
import { Sale } from 'src/app/models/sale.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SalesService, IUser } from 'src/app/service/sales.service';

@Component({
   selector: 'app-navigation',
   templateUrl: './navigation.component.html',
   styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

   @Select(GapiState.isSignedIn) isSignedIn$: Observable<boolean>;
   // @Select(SaleState.sales) sales$: Observable<Sale[]>;
   loading$: Observable<boolean> = this.sls.isLoading$;
   @HostBinding('class') componentCssClass;

   title: string;

   isDarkTheme = "";
   themeStr = '';

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
      private actions$: Actions,
      private sls: StateLoadingService,
      private router: Router,
      private titleServise: Title,
      private fireService: SalesService
   ) { }

   user: IUser = {
      name: "bben",
      age: 30
   }
   newUser: IUser = {
      name: "bben",
      age: 30,
      nikname: "nik"
   }

   users: IUser[] = [];

   add() {
      this.fireService.create(this.user).subscribe(res => {
         this.users.push({ ...this.user, id: res.name })
         console.log("add", res);
         // this.sales.push()
      })
   }

   get() {
      this.fireService.get().subscribe(res => {
         this.users = res;
         console.log("get:", res);
      });
   }
   update() {
      this.users[0].nikname = "nik";
      this.fireService.update(this.users[0]).subscribe(console.log)

   }
   delete() {
      this.fireService.delete(this.users[0]).subscribe((res) => {
         this.users.splice(0, 1);
         console.log("delete", this.users)
      });
   }
   edit() {
      this.users[0].nikname = "nik!!!";
      this.fireService.edit(this.users[0]).subscribe(console.log)
   }

   setTitle(url: string) {
      switch (url) {
         case "/sale-list":
            this.titleServise.setTitle("Продажи");
            this.title = "Продажи";
            break;
         case "/history":
            this.titleServise.setTitle("История продаж");
            this.title = "История продаж";
            break;
         case "/setting":
            this.titleServise.setTitle("Настройки");
            this.title = "Настройки";
            break;
         default:
            this.titleServise.setTitle("iw");
            this.title = "";
      }

   }

   ngOnInit() {
      this.setTitle(this.router.url)
      this.router.events
         .pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            map(e => e.url)
         )
         .subscribe(url => this.setTitle(url))

   }


   cbChange(checked: boolean) {
      this.isDarkTheme = checked ? "dark-theme" : "";
      this.theme.setTheme(this.isDarkTheme + " " + this.themeStr);
      // this.theme.setDarkTheme(checked);
      //this.componentCssClass = checked ? "dark-theme" : "";
   }

   signIn() {
      this.store.dispatch(new SignIn())
      // this.auth.signIn();
   }
   signOut() {
      this.store.dispatch(new SignOut())
      this.router.navigate(['/login'])

      // this.auth.signOut();
   }
   swappingTheme(theme) {
      this.themeStr = theme;

      this.theme.setTheme(this.isDarkTheme + " " + theme);
      // document.getElementById('themeAsset').href = `assest/${theme}`
   }


}


