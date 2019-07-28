import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';

const booksRoutes: Routes = [
  { path: '', component: BooksListComponent },
  { path: 'book/:id', component: BookDetailsComponent },
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