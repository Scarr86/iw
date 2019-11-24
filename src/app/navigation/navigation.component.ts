import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

@Component({
   selector: 'app-navigation',
   templateUrl: './navigation.component.html',
   styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
   links = [
      { name: "Sale", patch: "/sale-list" },
      { name: "History", patch: "/history" }
   ];

   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
         // tap(r => console.log(r)),
         map(result => result.matches),
         shareReplay()
      );

   constructor(private breakpointObserver: BreakpointObserver) { }

}
