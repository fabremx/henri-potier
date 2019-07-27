import { Book } from 'src/app/books/shared/book';

export class ShoppingCart {
  bookList: Book[];
  price: number;

  constructor(shoppingCart: any = {}) {
    this.bookList = shoppingCart.bookList || [];
    this.price = shoppingCart.price || 0;
  }
}
