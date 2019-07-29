import { BookQuantity } from './book-quantity';
import { Book } from 'src/app/books/shared/book';

describe('BookQuantity', () => {
  it('should create an instance', () => {
    expect(new BookQuantity()).toBeTruthy();
  });

  it('should create an empty instance of BookQuantity when contructor\'s arg is undefined', () => {
    const bookQuantity = new BookQuantity(undefined);

    expect(bookQuantity.book).toBeNull;
    expect(bookQuantity.quantity).toEqual(0);
  });

  it('should create an empty instance of Book when contructor\'s arg is empty', () => {
    const bookQuantity = new BookQuantity();

    expect(bookQuantity.book).toBeNull;
    expect(bookQuantity.quantity).toEqual(0);
  });

  it('should create an instance of Book when contructor\'s is an object', () => {
    const book = new Book({
      isbn: 'isbn', title: 'title', price: 10, cover: 'cover', synopsis: ['this', 'is', 'a', 'synopsis']
    });
    const bookQuantity = new BookQuantity(book, 2);

    expect(bookQuantity.book).toEqual(book);
    expect(bookQuantity.quantity).toEqual(2);
  });
});
