import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './pages/books/books.component';

const booksRoutes: Routes = [
  { path: '', component: BooksComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(booksRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class BooksRoutingModule {
}