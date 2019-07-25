import { Book } from './book';
import { expect } from 'chai';

describe('Book class instantiation', () => {
  it('should create an instance of Book when contructor\'s arg is undefined', () => {
    const book = new Book(undefined);

    expect(book).to.have.property('isbn').to.be.undefined;
    expect(book).to.have.property('title').to.be.equal('');
    expect(book).to.have.property('price').to.be.equal(0);
    expect(book).to.have.property('cover').to.be.equal('');
    expect(book).to.have.property('synopsis').to.be.an('array').that.is.empty
  });

  it('should create an instance of Book when contructor\'s arg is empty', () => {
    const book = new Book();

    expect(book).to.have.property('isbn').to.be.undefined;
    expect(book).to.have.property('title').to.be.equal('');
    expect(book).to.have.property('price').to.be.equal(0);
    expect(book).to.have.property('cover').to.be.equal('');
    expect(book).to.have.property('synopsis').to.be.an('array').that.is.empty
  });

  it('should create an instance of Book when contructor\'s is an object', () => {
    const book = new Book({
      isbn: 'isbn', title: 'title', price: 10, cover: 'cover', synopsis: ['this', 'is', 'a', 'synopsis']
    });

    expect(book).to.have.property('isbn').to.be.equal('isbn');
    expect(book).to.have.property('title').to.be.equal('title');
    expect(book).to.have.property('price').to.be.equal(10);
    expect(book).to.have.property('cover').to.be.equal('cover');
    expect(book).to.have.property('synopsis').to.eql(['this', 'is', 'a', 'synopsis']);
  });
});
