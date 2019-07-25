import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListComponent } from './books-list.component';
import { BooksService } from '../../shared/books.service';
import { Book } from '../../shared/book';
import { of } from 'rxjs';

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
      declarations: [ BooksListComponent ],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
