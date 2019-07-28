import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListComponent } from './books-list.component';
import { BooksService } from '../../shared/books.service';
import { Book } from '../../shared/book';
import { of, throwError } from 'rxjs';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { FormsModule } from '@angular/forms';
import { BookSearchComponent } from '../../components/book-search/book-search.component';
import { RouterModule } from '@angular/router';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;

  const booksServiceSpy = jasmine.createSpyObj('BooksService', ['getBooks']);

  const stubBooks = [new Book({
    isbn: 'isbn1',
    title: 'title 1',
    price: 10,
    cover: 'cover1',
    synopsis: ['this', 'is', 'a', 'synopsis']
  }),
  new Book({
    isbn: 'isbn2',
    title: 'title 2',
    price: 20,
    cover: 'cover2',
    synopsis: ['this', 'is', 'a', 'synopsis']
  })];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksListComponent, BookCardComponent, BookSearchComponent ],
      imports: [FormsModule, RouterModule.forRoot([])],
      providers: [{provide: BooksService, useValue: booksServiceSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    booksServiceSpy.getBooks.and.returnValue(of(stubBooks));
    spyOn(window, 'alert').and.callThrough();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(component.loader).toEqual(false);
  });

  describe('getBooks', () => {  
    it('should pass loader to false when getBooks succeed', async () => {
      // When
      await component.getBooks();
  
      // Then
      expect(component.loader).toEqual(false);
    });

    it('should pass loader to false when getBooks failed', async () => {
      // Given
      booksServiceSpy.getBooks.and.returnValue(throwError(new Error('failed!')));

      // When
      await component.getBooks();
  
      // Then
      expect(component.loader).toEqual(false);
    });

    it('should call alert when getBooks failed', async () => {
      // Given
      booksServiceSpy.getBooks.and.returnValue(throwError(new Error('failed!')));

      // When
      await component.getBooks();
  
      // Then
      expect(window.alert).toHaveBeenCalled();
    });
  });

  describe('updateBookList', () => {
    it('should find the book when search is a title book', () => {
      // Given
      const userSearch = "title 1";
      const expectedResult = [
        new Book({
          isbn: 'isbn1',
          title: 'title 1',
          price: 10,
          cover: 'cover1',
          synopsis: ['this', 'is', 'a', 'synopsis']
        })
      ];
      component.booksDisplayed = [];
      component.books = stubBooks;

      // When
      component.updateBookList(userSearch);

      // Then
      expect(component.booksDisplayed).toEqual(expectedResult);
    });

    it('should find books when search include letters of several books', () => {
      // Given
      const userSearch = "itle";
      component.booksDisplayed = [];
      component.books = stubBooks;

      // When
      component.updateBookList(userSearch);

      // Then
      expect(component.booksDisplayed).toEqual(stubBooks);
    });

    it('should find no book when search is incorrect', () => {
      // Given
      const userSearch = "titleeer";
      const expectedResult = [];
      component.booksDisplayed = stubBooks;
      component.books = stubBooks;

      // When
      component.updateBookList(userSearch);

      // Then
      expect(component.booksDisplayed).toEqual(expectedResult);
    });

    it('should find all books when search is empty', () => {
      // Given
      const userSearch = "";
      component.booksDisplayed = [];
      component.books = stubBooks;

      // When
      component.updateBookList(userSearch);

      // Then
      expect(component.booksDisplayed).toEqual(stubBooks);
    });
  });
});
