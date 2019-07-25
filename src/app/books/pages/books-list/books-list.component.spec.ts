import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListComponent } from './books-list.component';
import { BooksService } from '../../shared/books.service';
import { Book } from '../../shared/book';
import { of } from 'rxjs';
import { BookCardComponent } from '../../components/book-card/book-card.component';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;

  const booksServiceSpy = jasmine.createSpyObj('BooksService', ['getBooks']);
  const stubBooks = [new Book({
    isbn: 'isbn',
    title: 'title',
    price: 10,
    cover: 'cover',
    synopsis: ['this', 'is', 'a', 'synopsis']
  })];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksListComponent, BookCardComponent ],
      providers: [{provide: BooksService, useValue: booksServiceSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    booksServiceSpy.getBooks.and.returnValue(of(stubBooks));
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(component.loader).toEqual(false);
  });

  xit('should pass loader to true when getBooks is called', () => {
    // When
    component.getBooks();

    // Then
    expect(component.loader).toEqual(true);
  })

  it('should pass loader to false when getBooks succeed', async () => {
    // When
    await component.getBooks();

    // Then
    expect(component.loader).toEqual(false);
  })
});
