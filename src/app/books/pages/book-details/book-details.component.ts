import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Book } from '../../shared/book';
import { BooksService } from '../../shared/books.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  loader: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.loader = true;

    this.route.params.pipe(map(parameter => parameter.id))
      .subscribe((isbn: string) => {
        this.getBook(isbn);
      });
  }

  getBook(isbn: string): void {
    this.booksService.getBook(isbn)
      .subscribe((book: Book) => {
        this.book = book;
        this.loader = false;
      },
      () => {
        this.loader = false;
        alert('error');
      });
  }

  addBookToShoppingCart(book: Book): void {
    this.shoppingCartService.addBookToShoppingCart(book);
  }
}
