import { NgModule } from '@angular/core';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BooksComponent } from './pages/books/books.component';

@NgModule({
  imports: [
    BooksRoutingModule,
    SharedModule
  ],
  declarations: [
    BooksListComponent,
    BooksComponent
  ]
})

export class BooksModule { }
