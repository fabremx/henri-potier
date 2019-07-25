import { BooksService } from './books.service';
import { Book } from './book';
import { of, throwError } from 'rxjs';
import { ApiURLConfig } from 'src/app/configs/apiURL.config';

const stubBooks = [{
  isbn: 'isbn',
  title: 'title',
  price: 10,
  cover: 'cover',
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
      it('should call correct API URL', async () => {
        // When
        await booksService.getBooks();

        // Then
        expect(httpClientSpy.get).toHaveBeenCalledWith(ApiURLConfig.booksURL);
      });

      it('should return array of Book instance when server responding', () => {
        // Given
        const expectedResult = [new Book(stubBooks[0])];

        // When
        booksService.getBooks().subscribe((books) => {
          // Then
          expect(books).toEqual(expectedResult);
        })
      })

      it('should return an error when server isn\'t respond', () => {
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
