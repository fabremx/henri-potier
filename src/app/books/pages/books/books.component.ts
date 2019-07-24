import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../shared/books.service';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  bookList: Book[];

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooks()
      .subscribe((books: Book[]) => {
        this.bookList = books;
        console.log('Books recieved', this.bookList);
      },
      (error) => {
        console.log('error');
      });
  }

}
