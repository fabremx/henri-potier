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
  booksDisplayed: Book[] = [];
  loader: boolean = false;

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.loader = true;

    this.booksService.getBooks()
      .subscribe((books: Book[]) => {
        this.books = books;
        this.booksDisplayed = this.books;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        alert('Oups something went wrong !');
      });
  }

  updateBookList(userSearch: string): void {
    if (!userSearch)  {
      this.booksDisplayed = this.books;
      return;
    };

    this.booksDisplayed = this.books.filter(book => book.title.toLowerCase().includes(userSearch.toLowerCase()));
  }
}
