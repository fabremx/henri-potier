import { Injectable } from '@angular/core';
import { Book } from 'src/app/books/shared/book';
import { Subject, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCartSubject: Subject<any> = new Subject<any>();
  shoppingCart: ShoppingCart = new ShoppingCart();

  constructor() { }

  getShoppingCart(): ShoppingCart {
    return this.shoppingCart;
  }

  addBookToShoppingCart(book: Book): void {
    if (!book)  return;

    this.shoppingCart.bookList.push(book);
    this.shoppingCartSubject.next(this.shoppingCart.bookList);
  }

  getShoppingCartChange(): Observable<any> {
    return this.shoppingCartSubject.asObservable();
  }

  getPrice(): Number {
    return this.shoppingCart.price;
  }
}
