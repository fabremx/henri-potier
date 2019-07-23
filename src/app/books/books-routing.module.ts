import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';

const booksRoutes: Routes = [
  { path: '', component: BooksListComponent }
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