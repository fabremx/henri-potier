import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchComponent } from './book-search.component';
import { FormsModule } from '@angular/forms';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSearchComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search', () => {
    xit('should emit user search when user press enter in input', () => {

    });

    xit('should emit user search when user click on search button', () => {

    });
  });
});
