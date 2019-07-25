import { Book } from './book';

describe('Book class instantiation', () => {
  it('should create an instance of Book when contructor\'s arg is undefined', () => {
    const book = new Book(undefined);

    expect(book.isbn).toBeNull;
    expect(book.title).toEqual('');
    expect(book.price).toEqual(0);
    expect(book.cover).toEqual('');
    expect(book.synopsis).toEqual([]);
  });

  it('should create an instance of Book when contructor\'s arg is empty', () => {
    const book = new Book();

    expect(book.isbn).toBeNull;
    expect(book.title).toEqual('');
    expect(book.price).toEqual(0);
    expect(book.cover).toEqual('');
    expect(book.synopsis).toEqual([]);
  });

  it('should create an instance of Book when contructor\'s is an object', () => {
    const book = new Book({
      isbn: 'isbn', title: 'title', price: 10, cover: 'cover', synopsis: ['this', 'is', 'a', 'synopsis']
    });

    expect(book.isbn).toEqual('isbn');
    expect(book.title).toEqual('title');
    expect(book.price).toEqual(10);
    expect(book.price).not.toBeLessThan(0);
    expect(book.cover).toEqual('cover');
    expect(book.synopsis).toEqual(['this', 'is', 'a', 'synopsis']);
  });
});
