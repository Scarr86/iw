import { Component, OnInit, AfterViewInit, HostBinding } from '@angular/core';
import { DriveStore } from './store/drive.store';
import { merge, Observable } from 'rxjs';
import { ThemeService } from './service/theme.service';
import { Store, Select } from '@ngxs/store';
import { GetSales } from './store/actions/sale.actions';
import { SaleState } from './store/state/sale.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  @HostBinding('class') componentCssClass;
  @Select(SaleState.loading) loading$:Observable<boolean>;


  title = 'iw';
  constructor(
    private driveStore: DriveStore,
    private theme: ThemeService,
    private store:Store
  ) {
  }
  ngOnInit() {
    // this.loading$ = merge(this.saleStory.selectIsLoading(), this.driveStore.loading$);
    this.theme.isDarkTheme.subscribe((isDark) => this.componentCssClass = isDark ? "dark-theme" : "")
    this.theme.theme.subscribe((theme) => {
      this.componentCssClass= theme.split(" ")[0]+" "+ theme.split(" ")[1];
    })
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
