import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartListComponent } from './shopping-cart-list.component';
import { ShoppingCartItemComponent } from '../../components/shopping-cart-item/shopping-cart-item.component';
import { RouterModule } from '@angular/router';
import { Book } from 'src/app/books/shared/book';

describe('ShoppingCartListComponent', () => {
  let component: ShoppingCartListComponent;
  let fixture: ComponentFixture<ShoppingCartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ShoppingCartListComponent,
        ShoppingCartItemComponent
      ],
      imports: [ RouterModule.forRoot([]) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getTotalPriceBeforeDiscount', () => {
    it('should return the total price of books in shopping cart', () => {
      // Given
      component.shoppingCart.bookList = [new Book({
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

      const expectedResult = 30;

      // When
      const result = component.getTotalPriceBeforeDiscount();

      // Then
      expect(result).toEqual(expectedResult)
    })
  });
});
