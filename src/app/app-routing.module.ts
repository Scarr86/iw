import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HistoryComponent } from './components/history/history.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SettingContainerComponent } from './containers/setting/setting-container.component';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { FileListContainerComponent } from './containers/file-list-container/file-list-container.component';
import { LoginComponent } from './components/login/login.component';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SaleDetailComponent } from './components/sale-list/sale-detail/sale-detail.component';

const routesSection: Routes = [
   { path: "", redirectTo: "sale-list", pathMatch: "full" },
   { path: "sale-list", component: SaleListComponent },
   { path: "history", component: HistoryComponent },
   { path: "setting", component: SettingContainerComponent },
   { path: "sale-detail/:id", component: SaleDetailComponent },
   { path: "file-list", component: FileListContainerComponent }
]
// children: routesSection
// component:NavigationComponent
const routes: Routes = [
   { path: "", component: NavigationComponent, children: routesSection },
   { path: "login", component: LoginComponent },
   { path: "**", component: NotFoundComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
