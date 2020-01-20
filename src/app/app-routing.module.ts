import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HistoryComponent } from './components/history/history.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SettingContainerComponent } from './containers/setting/setting-container.component';
import { SaleListContainerComponent } from './containers/sale-list-container/sale-list-container.component';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { FileListContainerComponent } from './containers/file-list-container/file-list-container.component';

const routesSection: Routes = [
   {path: "", redirectTo:"sale-list", pathMatch:"full"},
   {path:"sale-list", component:SaleListContainerComponent},
   {path:"history", component:HistoryComponent},
   {path:"setting", component:SettingContainerComponent},
   {path:"product-list/:id", component:ProductListContainerComponent},
   {path:"file-list", component:FileListContainerComponent}
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
