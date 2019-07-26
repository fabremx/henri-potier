import { Injectable } from '@angular/core';
import { Book } from 'src/app/books/shared/book';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCartSubject: Subject<any> = new Subject<any>();

  cart: Book[] = [];
  price: number = 0;

  constructor() { }

  getShoppingCart(): Book[] {
    return this.cart;
  }

  addBookToShoppingCart(book: Book): void {
    if (!book)  return;

    this.cart.push(book);
    this.shoppingCartSubject.next(this.cart);
  }

  getShoppingCartChange(): Observable<any> {
    return this.shoppingCartSubject.asObservable();
  }

  getPrice(): Number {
    return this.price;
  }
}
