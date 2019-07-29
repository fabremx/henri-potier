import { ShoppingCart } from './shopping-cart';
import { Book } from 'src/app/books/shared/book';

describe('ShoppingCart', () => {
  it('should create an instance', () => {
    expect(new ShoppingCart()).toBeTruthy();
  });

  it('should create an instance of ShoppingCart when contructor\'s arg is undefined', () => {
    const shoppingCart = new ShoppingCart(undefined);

    expect(shoppingCart.bookList).toEqual([]);
    expect(shoppingCart.price).toEqual(0);
  });

  it('should create an instance of ShoppingCart when contructor\'s arg is empty', () => {
    const shoppingCart = new ShoppingCart();

    expect(shoppingCart.bookList).toEqual([]);
    expect(shoppingCart.price).toEqual(0);
  });

  it('should create an instance of ShoppingCart when contructor\'s has parameters', () => {
    const book = new Book({
      isbn: 'isbn', title: 'title', price: 10, cover: 'cover', synopsis: ['this', 'is', 'a', 'synopsis']
    });
    const shoppingCart = new ShoppingCart([book], 12);

    expect(shoppingCart.bookList).toEqual([book]);
    expect(shoppingCart.price).toEqual(12);
  });
});
