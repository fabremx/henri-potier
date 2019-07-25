export class Book {
  isbn: string;
  title: string;
  price: number;
  cover: string;
  synopsis: string[];

  constructor(book: any = {}) {
    this.isbn = book.isbn;
    this.title = book.title || '';
    this.price = book.price || 0;
    this.cover = book.cover || '';
    this.synopsis = book.synopsis || [];
  }
}
