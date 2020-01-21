import { Component, OnInit, AfterViewInit, HostBinding } from '@angular/core';
import { SaleStore } from './store/sale.store';
import { DriveStore } from './store/drive.store';
import { merge, Observable } from 'rxjs';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  @HostBinding('class') componentCssClass;
  
  loading$: Observable<boolean>;

  title = 'iw';
  constructor(
    private saleStory: SaleStore,
    private driveStore: DriveStore,
    private theme: ThemeService
  ) {
  }
  ngOnInit() {
    // this.loading$ = merge(this.saleStory.selectIsLoading(), this.driveStore.loading$);
    this.theme.isDarkTheme.subscribe((isDark) => this.componentCssClass = isDark ? "dark-theme" : "")
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.saleStory.getSaleList();
    // }, 0)
  }

  onRouterOutletActivate(event: Component) {
    // console.log(event);
  }

}
