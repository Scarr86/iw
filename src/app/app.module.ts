import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

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

// the second parameter 'ru' is optional
registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SaleListComponent,
    NotFoundComponent,
    HistoryComponent,
    ProductListComponent,
    ProductItemComponent,
    SaleItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "ru" }],
  bootstrap: [AppComponent] 

})
export class AppModule { }
