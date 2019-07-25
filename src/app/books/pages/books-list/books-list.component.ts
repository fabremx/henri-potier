import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../shared/books.service';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];
  loader: boolean = false;

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.loader = true;

    this.booksService.getBooks()
      .subscribe((books: Book[]) => {
        this.books = books;
        this.loader = false;
        console.log('Books recieved', this.books);
      },
      (error) => {
        this.loader = false;
        console.log('error', error);
      });
  }
}
