import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartListComponent } from './pages/shopping-cart-list/shopping-cart-list.component';

const booksRoutes: Routes = [
  { path: 'shopping-cart', component: ShoppingCartListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(booksRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ShoppingCartRoutingModule {
}