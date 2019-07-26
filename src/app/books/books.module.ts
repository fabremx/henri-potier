import { NgModule } from '@angular/core';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { BookCardComponent } from './components/book-card/book-card.component';
import { SharedModule } from '../shared/shared.module';
import { BookSearchComponent } from './components/book-search/book-search.component';

@NgModule({
  imports: [
    BooksRoutingModule,
    SharedModule
  ],
  declarations: [
    BooksListComponent,
    BookCardComponent,
    BookSearchComponent
  ]
})

export class BooksModule { }
