import { TestBed } from '@angular/core/testing';

import { ShoppingCartService } from './shopping-cart.service';
import { Book } from 'src/app/books/shared/book';

let service: ShoppingCartService

describe('ShoppingCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ShoppingCartService);
  });

  it('should be created with correct ', () => {
    expect(service).toBeTruthy();
  });

  it('should instantiate values of the service', () => {
    expect(service.shoppingCart.bookList).toEqual([]);
    expect(service.shoppingCart.price).toEqual(0);
  });

  describe('addBookToShoppingCart', () => {
    it('should add a new book in shopping cart when book is correct book', () => {
      // Given
      service.shoppingCart.bookList = [new Book({
        isbn: 'isbn2',
        title: 'title 2',
        price: 50,
        cover: 'cover2',
        synopsis: ['this', 'is', 'a', 'synopsis']
      })];

      const bookToAdd = new Book({
        isbn: 'isbn1',
        title: 'title 1',
        price: 10,
        cover: 'cover1',
        synopsis: ['this', 'is', 'a', 'synopsis']
      })

      const expectedResult = [
        new Book({
          isbn: 'isbn2',
          title: 'title 2',
          price: 50,
          cover: 'cover2',
          synopsis: ['this', 'is', 'a', 'synopsis']
        }),
        new Book({
          isbn: 'isbn1',
          title: 'title 1',
          price: 10,
          cover: 'cover1',
          synopsis: ['this', 'is', 'a', 'synopsis']
        })
      ];

      // When
      service.addBookToShoppingCart(bookToAdd);

      // Then
      expect(service.shoppingCart.bookList.length).toEqual(2);
      expect(service.shoppingCart.bookList).toEqual(expectedResult);
    });

    it('should not add book when book to add is undefined', () => {
      // Given
      service.shoppingCart.bookList = [new Book({
        isbn: 'isbn2',
        title: 'title 2',
        price: 50,
        cover: 'cover2',
        synopsis: ['this', 'is', 'a', 'synopsis']
      })];
      
      const bookToAdd = undefined;

      const expectedResult = [
        new Book({
          isbn: 'isbn2',
          title: 'title 2',
          price: 50,
          cover: 'cover2',
          synopsis: ['this', 'is', 'a', 'synopsis']
        })];

      // When
      service.addBookToShoppingCart(bookToAdd);

      // Then
      expect(service.shoppingCart.bookList.length).toEqual(1);
      expect(service.shoppingCart.bookList).toEqual(expectedResult);
    });

    it('should emit shopping cart when book to add is not undefined', () => {
      // Given
      const bookToAdd = new Book({
        isbn: 'isbn1',
        title: 'title 1',
        price: 10,
        cover: 'cover1',
        synopsis: ['this', 'is', 'a', 'synopsis']
      });

      spyOn(service.shoppingCartSubject, 'next');

      // When
      service.addBookToShoppingCart(bookToAdd);

      // Then
      expect(service.shoppingCartSubject.next).toHaveBeenCalled();
    });

    it('should not emit shopping cart when book to add is undefined', () => {
      // Given
      const bookToAdd = undefined;
      spyOn(service.shoppingCartSubject, 'next');

      // When
      service.addBookToShoppingCart(bookToAdd);

      // Then
      expect(service.shoppingCartSubject.next).not.toHaveBeenCalled();
    });
  });
});
