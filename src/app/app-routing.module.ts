import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesConfig } from './configs/routes.config';

const routes: Routes = [
  { 
    path: RoutesConfig.books,
    loadChildren: () => import('./books/books.module').then(m => m.BooksModule)
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