import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartListComponent } from './shopping-cart-list.component';
import { ShoppingCartItemComponent } from '../../components/shopping-cart-item/shopping-cart-item.component';
import { RouterModule } from '@angular/router';
import { Book } from 'src/app/books/shared/book';
import { BookQuantity } from '../../shared/book-quantity';
import { HttpClientModule } from '@angular/common/http';
import { CartDiscountService } from '../../shared/cart-discount.service';
import { of, throwError } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

describe('ShoppingCartListComponent', () => {
  let component: ShoppingCartListComponent;
  let fixture: ComponentFixture<ShoppingCartListComponent>;

  const stubDiscountOffers = {
    offers: [
      { "type": "percentage", "value": 5 },
      { "type": "minus", "value": 15 },
      { "type": "slice", "sliceValue": 100, "value": 12 }
    ]
  };
  const cartDiscountServiceSpy = jasmine.createSpyObj('CartDiscountService', ['getDiscountOffers']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ShoppingCartListComponent,
        ShoppingCartItemComponent
      ],
      imports: [ 
        RouterModule.forRoot([]),
        HttpClientModule 
      ],
      providers: [{provide: CartDiscountService, useValue: cartDiscountServiceSpy}, ShoppingCartService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartListComponent);
    component = fixture.componentInstance;
    cartDiscountServiceSpy.getDiscountOffers.and.returnValue(of(stubDiscountOffers));
    spyOn(window, 'alert').and.callThrough();
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

  describe('getBookListWithQuantity', () => {
    it('should return list of book without doublon and with the quantity for each book', () => {
      // Given
      component.shoppingCart.bookList = [
        new Book({
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
        }),
        new Book({
          isbn: 'isbn1',
          title: 'title 1',
          price: 10,
          cover: 'cover1',
          synopsis: ['this', 'is', 'a', 'synopsis']
        })
      ];

      const expectedResult: BookQuantity[] = [
        {
          book: new Book({
            isbn: 'isbn1',
            title: 'title 1',
            price: 10,
            cover: 'cover1',
            synopsis: ['this', 'is', 'a', 'synopsis']
          }),
          quantity: 2
        },
        {
          book: new Book({
            isbn: 'isbn2',
            title: 'title 2',
            price: 20,
            cover: 'cover2',
            synopsis: ['this', 'is', 'a', 'synopsis']
          }),
          quantity: 1
        }
      ];

      // When
      const result = component.getBookListWithQuantity()

      // Then
      expect(result).toEqual(expectedResult);
    });

    it('sould return and empty array when there are no books in shopping cart', () => {
      // Given
      component.shoppingCart.bookList = [];

      // When
      const result = component.getBookListWithQuantity()

      // Then
      expect(result).toEqual([]);
    });
  });

  describe('getPriceAfterBestDiscount', () => {
    it('should call getDiscountOffers with correct isbn list', () => {
      // Given
      component.shoppingCart.bookList = [
        new Book({
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
        })
      ];

      const expectedResult = 'isbn1,isbn2';
      // When
      component.getPriceAfterBestDiscount();

      // Then
      expect(cartDiscountServiceSpy.getDiscountOffers).toHaveBeenCalledWith(expectedResult);
    });

    it('should alert the user when the service responds an error', () => {
      // Given
      cartDiscountServiceSpy.getDiscountOffers.and.returnValue(throwError(new Error('error!')));

      // When
      component.getPriceAfterBestDiscount();

      // Then
      expect(window.alert).toHaveBeenCalled();
    });

    it('should return percentage discount when price after percentage discount is lower than other discount', () => {
       // Given
       component.priceBeforeDiscount = 150;
       const stubDiscountOffers = {
        offers: [
          { "type": "percentage", "value": 55 },
          { "type": "minus", "value": 15 },
          { "type": "slice", "sliceValue": 100, "value": 12 }
        ]
      }
      const expectedResult = 67.5;
      cartDiscountServiceSpy.getDiscountOffers.and.returnValue(of(stubDiscountOffers));

       // When
       component.getPriceAfterBestDiscount();
 
       // Then
       expect(component.priceAfterDiscount).toEqual(expectedResult);
    });

    it('should return minus discount when price after minus discount is lower than other discount', () => {
      // Given
      component.priceBeforeDiscount = 150;
      const stubDiscountOffers = {
       offers: [
         { "type": "percentage", "value": 2 },
         { "type": "minus", "value": 50 },
         { "type": "slice", "sliceValue": 100, "value": 12 }
       ]
     }
     const expectedResult = 100;
     cartDiscountServiceSpy.getDiscountOffers.and.returnValue(of(stubDiscountOffers));

      // When
      component.getPriceAfterBestDiscount();

      // Then
      expect(component.priceAfterDiscount).toEqual(expectedResult);
    });

    it('should return slice discount when price after slice discount is lower than other discount', () => {
      // Given
      component.priceBeforeDiscount = 250;
      const stubDiscountOffers = {
       offers: [
         { "type": "percentage", "value": 55 },
         { "type": "minus", "value": 15 },
         { "type": "slice", "sliceValue": 100, "value": 80 }
       ]
     }
     const expectedResult = 90;
     cartDiscountServiceSpy.getDiscountOffers.and.returnValue(of(stubDiscountOffers));

      // When
      component.getPriceAfterBestDiscount();

      // Then
      expect(component.priceAfterDiscount).toEqual(expectedResult);
    });
  })
});
