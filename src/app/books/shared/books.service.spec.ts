import { BooksService } from './books.service';
import { Book } from './book';
import { of, throwError } from 'rxjs';

const stubBooks = [{
  isbn: 'isbn1',
  title: 'title1',
  price: 10,
  cover: 'cover1',
  synopsis: ['this', 'is', 'a', 'synopsis']
},
{
  isbn: 'isbn2',
  title: 'title2',
  price: 20,
  cover: 'cover2',
  synopsis: ['this', 'is', 'a', 'synopsis']
}];

let httpClientSpy: { get: jasmine.Spy };
let booksService: BooksService;

describe('Book Service', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    booksService = new BooksService(<any> httpClientSpy);

    httpClientSpy.get.and.returnValue(of(stubBooks));
  });
  
  it('should be created', () => {
    expect(booksService).toBeTruthy();
  });
    
  describe(('getBooks'), () => {
    it('should call correct API URL', () => {
      // Given
      const expectedUrl = 'http://henri-potier.xebia.fr/books';
  
      // When
      booksService.getBooks();

      // Then
      expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
    });

    it('should return array of Book instance when server responds', () => {
      // Given
      const expectedResult = [
        new Book(stubBooks[0]),
        new Book(stubBooks[1])
      ];

      // When
      booksService.getBooks().subscribe((books) => {
        // Then
        expect(books).toEqual(expectedResult);
      })
    })

    it('should return an error when server does not respond', () => {
      // Given
      httpClientSpy.get.and.returnValue(throwError(new Error('Server down !')));

      // When
      booksService.getBooks().subscribe(() => {}, (error) => {
        // Then
        expect(error).toEqual(new Error('Server down !'));
      });
    });
  });

  describe(('getBook'), () => {
    it('should call correct API URL', () => {
      // Given
      const isbn = 'isbn1';
      const expectedUrl = 'http://henri-potier.xebia.fr/books';
  
      // When
      booksService.getBook(isbn);

      // Then
      expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
    });

    it('should return the Book which match with isbn passed in parameter when server responds', () => {
      // Given
      const isbn = 'isbn2'
      const expectedResult = new Book(stubBooks[1]);

      // When
      booksService.getBook(isbn).subscribe((book) => {
        // Then
        expect(book).toEqual(expectedResult);
      });
    });

    it('should return null when isbn passed in parameter is a wrong isbn', () => {
      // Given
      const isbn = 'wrongISBN'
      const expectedResult = null;

      // When
      booksService.getBook(isbn).subscribe((book) => {
        // Then
        expect(book).toEqual(expectedResult);
      });
    });

    it('should return an error when server does not respond', () => {
      // Given
      httpClientSpy.get.and.returnValue(throwError(new Error('Server down !')));

      // When
      booksService.getBooks().subscribe(() => {}, (error) => {
        // Then
        expect(error).toEqual(new Error('Server down !'));
      });
    });
  });
});
