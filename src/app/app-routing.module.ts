import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesConfig } from './configs/routes.config';

const routes: Routes = [
  { 
    path: RoutesConfig.books,
    loadChildren: () => import('./books/books.module').then(m => m.BooksModule)
  },
  { 
    path: RoutesConfig.shoppingCart,
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}