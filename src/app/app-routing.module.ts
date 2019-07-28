import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesConfig } from './configs/routes.config';
import { Error404Component } from './shared/pages/error404/error404.component';

const routes: Routes = [
  { 
    path: RoutesConfig.books,
    loadChildren: () => import('./books/books.module').then(m => m.BooksModule)
  },
  { 
    path: RoutesConfig.shoppingCart,
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)
  },
  {
    path: '**',
    component: Error404Component
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