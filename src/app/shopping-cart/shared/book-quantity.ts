import { Book } from 'src/app/books/shared/book';

export class BookQuantity {
  book: Book;
  quantity: number

  constructor(book = null, quantity = 0) {
    this.book = book
    this.quantity = quantity;
  }
}
