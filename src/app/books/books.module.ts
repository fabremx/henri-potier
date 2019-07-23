import { NgModule } from '@angular/core';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksRoutingModule } from './books-routing.module';

@NgModule({
  declarations: [
    BooksListComponent
  ],
  imports: [
    BooksRoutingModule
  ]
})

export class BooksModule { }
