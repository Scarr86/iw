import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';

import { NgxsModule } from "@ngxs/store";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin"
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';


import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MaterialModule } from './material/material.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HistoryComponent } from './components/history/history.component';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SaleListContainerComponent } from './containers/sale-list-container/sale-list-container.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { SaleItemComponent } from './components/sale-list/sale-item/sale-item.component';
import { SettingContainerComponent } from './containers/setting/setting-container.component';
import { Auth2Service } from './service/google-gapi/auth2.service';
import { DriveViewerComponent } from './components/drive-viewer/drive-viewer.component';
import { ConnectFormControlDirective } from './components/connect-form.directive';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './service/theme.service';
import { ModalDialogComponent } from './components/drive-viewer/modal-diolog/modal-diolog.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { EasyEnterComponent } from './components/easy-enter/easy-enter.component';
import { ConnectFormGroupDirective } from './components/product-list/connect-form-group.directive';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { SettingComponent } from './components/setting/setting.component';
import { FileListContainerComponent } from './containers/file-list-container/file-list-container.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { FileState } from './store/state/file.state';
import { LoginComponent } from './components/login/login.component';

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
    SaleListContainerComponent,
    NotFoundComponent,
    HistoryComponent,
    ProductListComponent,
    ProductItemComponent,
    SaleItemComponent,
    SettingContainerComponent,
    DriveViewerComponent,
    ConnectFormControlDirective,
    ModalDialogComponent,
    EasyEnterComponent,
    ConnectFormGroupDirective,
    ProductListContainerComponent,
    SettingComponent,
    FileListContainerComponent,
    FileListComponent,
    ToolBarComponent,
    LoginComponent
  ],
  entryComponents: [
    ModalDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([FileState], {
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false
      }
    }),
    // NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
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
