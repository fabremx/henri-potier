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
    it('should call addBookToShoppingCart function', async(() => {
      // Given
      const userSearch = 'search';
      spyOn(component.searchEmitter, 'emit');

      // When
      component.search(userSearch);

      // Then
      expect(component.searchEmitter.emit).toHaveBeenCalledWith(userSearch);
    }));
  });
});
