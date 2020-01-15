import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HistoryComponent } from './history/history.component';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SettingComponent } from './setting/setting.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routesSection: Routes = [
   {path: "", redirectTo:"sale-list", pathMatch:"full"},
   {path:"sale-list", component:SaleListComponent},
   {path:"history", component:HistoryComponent},
   {path:"setting", component:SettingComponent},
   {path:"product-list/:id", component:ProductListComponent},
]
// children: routesSection
// component:NavigationComponent
const routes: Routes = [
   {path:"", component:NavigationComponent, children: routesSection  },
   {path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
