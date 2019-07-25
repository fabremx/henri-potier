import { NgModule } from '@angular/core';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    BooksRoutingModule,
    SharedModule
  ],
  declarations: [
    BooksListComponent
  ]
})

export class BooksModule { }
