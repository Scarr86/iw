import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { registerLocaleData, APP_BASE_HREF } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from './material/material.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HistoryComponent } from './history/history.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SaleListComponent } from './sale-list/sale-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { SaleItemComponent } from './sale-list/sale-item/sale-item.component';
import { SettingComponent } from './setting/setting.component';
import { Auth2Service } from './service/google-gapi/auth2.service';
import { DriveViewerComponent } from './components/drive-viewer/drive-viewer.component';
import { ConnectFormControlDirective } from './components/connect-form.directive';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './service/theme.service';

// the second parameter 'ru' is optional
registerLocaleData(localeRu, 'ru');

export function initGapi(gapiSession: Auth2Service) {
  return () => gapiSession.initGapi();
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SaleListComponent,
    NotFoundComponent,
    HistoryComponent,
    ProductListComponent,
    ProductItemComponent,
    SaleItemComponent,
    SettingComponent,
    DriveViewerComponent,
    ConnectFormControlDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initGapi, deps: [Auth2Service], multi: true },

    { provide: LOCALE_ID, useValue: "ru" }
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
  constructor(overlayContainer: OverlayContainer, private theme: ThemeService) {
    theme.isDarkTheme.subscribe((isDark) => isDark ? 
    overlayContainer.getContainerElement().classList.add('dark-theme') : 
    overlayContainer.getContainerElement().classList.remove('dark-theme'))
  }
}
