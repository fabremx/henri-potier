import { Book } from 'src/app/books/shared/book';

export class ShoppingCart {
  bookList: Book[];
  price: number;

  constructor(bookList?: Book[], price?: number) {
    this.bookList = bookList || [];
    this.price = price || 0;
  }
}
