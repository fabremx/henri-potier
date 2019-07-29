import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardComponent } from './book-card.component';
import { RouterModule } from '@angular/router';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Book } from '../../shared/book';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  const shoppingCartServiceSpy = jasmine.createSpyObj('ShoppingCartService', ['addBookToShoppingCart']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCardComponent ],
      imports: [ RouterModule.forRoot([]) ],
      providers: [{ provide: ShoppingCartService, useValue: shoppingCartServiceSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addBookToShoppingCart', () => {
    it('should call addBookToShoppingCart function', async(() => {
      // Given
      const book = new Book();

      // When
      component.addBookToShoppingCart(book);

      // Then
      expect(shoppingCartServiceSpy.addBookToShoppingCart).toHaveBeenCalledWith(book);
    }));
  });
});
