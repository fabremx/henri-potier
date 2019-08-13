import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Book } from '../../shared/book';
import { throwError, of } from 'rxjs';
import { BooksService } from '../../shared/books.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let instance;

  const booksServiceSpy = jasmine.createSpyObj('BooksService', ['getBook']);
  const shoppingCartServiceSpy = jasmine.createSpyObj('ShoppingCartService', ['addBookToShoppingCart']);

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
      providers: [
        { provide: BooksService, useValue: booksServiceSpy },
        { provide: ShoppingCartService, useValue: shoppingCartServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    instance = fixture.debugElement.nativeElement;
    booksServiceSpy.getBook.and.returnValue(of(stubBook));
    shoppingCartServiceSpy.addBookToShoppingCart.and.returnValue(of());
    spyOn(window, 'alert').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.loader).toEqual(false);
  });

  describe('getBook', () => {  
    it('should pass loader to false when getBook succeed', () => {
      // Given
      component.loader = true;
      const isbn = 'isbn';

      // When
      component.getBook(isbn);
  
      // Then
      expect(component.loader).toEqual(false);
    });

    it('should pass loader to false when getBooks failed', () => {
      // Given
      const isbn = 'isbn';
      booksServiceSpy.getBook.and.returnValue(throwError(new Error('failed!')));

      // When
      component.getBook(isbn);
  
      // Then
      expect(component.loader).toEqual(false);
    });

    it('should call alert when getBooks failed', () => {
      // Given
      const isbn = 'isbn';
      spyOn(console, 'error');
      booksServiceSpy.getBook.and.returnValue(throwError(new Error('failed!')));

      // When
      component.getBook(isbn);
  
      // Then
      expect(console.error).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalled();
    });
  });

  describe('addBookToShoppingCart', () => {
    it('should call addBookToShoppingCart function', () => {
      // Given
      const book = new Book();

      // When
      component.addBookToShoppingCart(book);

      // Then
      expect(shoppingCartServiceSpy.addBookToShoppingCart).toHaveBeenCalledWith(book);
    });
  });
});
