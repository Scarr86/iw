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
import { DriveViewerComponent } from './components/drive-viewer/drive-viewer.component';
import { ConnectFormControlDirective } from './components/connect-form.directive';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './service/theme.service';
import { ModalDialogComponent } from './components/drive-viewer/modal-diolog/modal-diolog.component';
import { ConnectFormGroupDirective } from './components/sale-list/sale-detail/connect-form-group.directive';
import { SettingComponent } from './components/setting/setting.component';
import { FileListComponent } from './components/setting/file-list/file-list.component';
import { FileState } from './store/state/file.state';
import { LoginComponent } from './components/login/login.component';
import { SaleState } from './store/state/sale.state';
import { GapiState } from './store/state/auth.state';
import { GapiService } from './service/google-gapi/gapi.service';
import { environment } from 'src/environments/environment';
import { SaleDetailComponent } from './components/sale-list/sale-detail/sale-detail.component';
import { SaleFormControlComponent } from './components/sale-list/sale-form-control/sale-form-control.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchProductComponent } from './components/sale-list/search-product/search-product.component';
import { SearchPipe } from './components/sale-list/search.pipe';
import { FormProductsComponent } from './components/sale-list/form-products/form-products.component';
import { StateLoadingService } from './service/state-loading.service';

// the second parameter 'ru' is optional
registerLocaleData(localeRu, 'ru');

export function initGapi(gapiService: GapiService) {
  return () => gapiService.initGapi();
  // return ()=>{}
}
export function noop(){
  return function(){};
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SaleListComponent,
    NotFoundComponent,
    HistoryComponent,
    DriveViewerComponent,
    ConnectFormControlDirective,
    ModalDialogComponent,
    ConnectFormGroupDirective,
    SettingComponent,
    FileListComponent,
    LoginComponent,
    SaleDetailComponent,
    SaleFormControlComponent,
    SearchProductComponent,
    SearchPipe,
    FormProductsComponent,
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
    HttpClientModule,
    // NgxsModule.forRoot(states, { developmentMode: !environment.production }),
    NgxsModule.forRoot([FileState, SaleState, GapiState], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false
      }
    }),
    // NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    // { provide: APP_INITIALIZER, 
    //   useFactory: initGapi, 
    //   deps: [GapiService], 
    //   multi: true 
    // }, 
    { provide: APP_INITIALIZER, 
      useFactory: noop, 
      deps: [StateLoadingService], 
      multi: true 
    },

    { provide: LOCALE_ID, useValue: "ru" }
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
  constructor(overlayContainer: OverlayContainer, private theme: ThemeService) {
    this.theme.theme.subscribe((t) => {
      console.log(t);
      let tt = t.split(" ")[0];
      let ttt = t.split(" ")[1];
      overlayContainer.getContainerElement().classList.remove('deep-purple')
      overlayContainer.getContainerElement().classList.remove('dark-theme');
      if (tt) {
        overlayContainer.getContainerElement().classList.add(tt);
      }
      if (ttt) {
        overlayContainer.getContainerElement().classList.add(ttt);
      }



      // this.componentCssClass= theme.split(" ")[0]+" "+ theme.split(" ")[1];
    })

    // theme.isDarkTheme.subscribe((isDark) => isDark ?
    //   overlayContainer.getContainerElement().classList.add('dark-theme') :
    //   overlayContainer.getContainerElement().classList.remove('dark-theme'))
  }
}
