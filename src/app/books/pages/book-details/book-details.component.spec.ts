import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Book } from '../../shared/book';
import { throwError, of } from 'rxjs';
import { BooksService } from '../../shared/books.service';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  const booksServiceSpy = jasmine.createSpyObj('BooksService', ['getBook']);

  const stubBook = new Book({
    isbn: 'isbn1',
    title: 'title 1',
    price: 10,
    cover: 'cover1',
    synopsis: ['this', 'is', 'a', 'synopsis']
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailsComponent ],
      imports: [ RouterModule.forRoot([]), HttpClientModule ],
      providers: [{provide: BooksService, useValue: booksServiceSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    booksServiceSpy.getBook.and.returnValue(of(stubBook));
    spyOn(window, 'alert').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.loader).toEqual(false);
  });

  describe('getBook', () => {  
    it('should pass loader to false when getBook succeed', async () => {
      // Given
      component.loader = true;
      const isbn = 'isbn';

      // When
      await component.getBook(isbn);
  
      // Then
      expect(component.loader).toEqual(false);
    });

    it('should pass loader to false when getBooks failed', async () => {
      // Given
      const isbn = 'isbn';
      booksServiceSpy.getBook.and.returnValue(throwError(new Error('failed!')));

      // When
      await component.getBook(isbn);
  
      // Then
      expect(component.loader).toEqual(false);
    });

    it('should call alert when getBooks failed', async () => {
      // Given
      const isbn = 'isbn';
      booksServiceSpy.getBook.and.returnValue(throwError(new Error('failed!')));

      // When
      await component.getBook(isbn);
  
      // Then
      expect(window.alert).toHaveBeenCalled();
    });
  });
});
