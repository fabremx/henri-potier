import { CartDiscountService } from './cart-discount.service';
import { of, throwError } from 'rxjs';
import { DiscountOffers, ClassicDiscount, SliceDiscount } from './discount-offers';

const stubDiscount = {
  "offers": [
    { "type": "percentage", "value": 5 },
    { "type": "minus", "value": 15 },
    { "type": "slice", "sliceValue": 100, "value": 12 }
  ]
};

let httpClientSpy: { get: jasmine.Spy };
let cartDiscountService: CartDiscountService;

describe('CartDiscountService', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    cartDiscountService = new CartDiscountService(<any> httpClientSpy);

    httpClientSpy.get.and.returnValue(of(stubDiscount));
  });

  it('should be created', () => {
    expect(cartDiscountService).toBeTruthy();
  });

  describe(('getDiscountOffers'), () => {
    describe('Tests query param', () => {
      it('should call correct API URL when queryParam is not empty', async () => {
        // Given
        const queryParam = 'isbn1,isbn2';
        const expectedUrl = 'http://henri-potier.xebia.fr/books/isbn1,isbn2/commercialOffers';

        // When
        await cartDiscountService.getDiscountOffers(queryParam).toPromise();

        // Then
        expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
      });
    });

    describe('Tests discountOffer object returned', () => {
      it('should return 1 of 3 discount offers object when server return 1 discounts', () => {
        // Given
        const queryParam = 'isbn1,isbn2';
        const stubDiscount = {
          "offers": [
            { "type": "slice", "sliceValue": 100, "value": 12 }
          ]
        };
        httpClientSpy.get.and.returnValue(of(stubDiscount));
        const expectedResult = new DiscountOffers([
          new SliceDiscount(100, 12)
        ]);
  
        // When
        cartDiscountService.getDiscountOffers(queryParam).subscribe((discounts) => {
          // Then
          expect(Object.assign({}, discounts)).toEqual(Object.assign({}, expectedResult));
        })
      });
  
      it('should return 2 of 3 discount offers object when server return 2 discounts', () => {
        // Given
        const queryParam = 'isbn1,isbn2';
        const stubDiscount = {
          "offers": [
            { "type": "percentage", "value": 5 },
            { "type": "slice", "sliceValue": 100, "value": 12 }
          ]
        };
        httpClientSpy.get.and.returnValue(of(stubDiscount));
        const expectedResult = new DiscountOffers([
          new ClassicDiscount('percentage', 5),
          new SliceDiscount(100, 12)
        ]);
  
        // When
        cartDiscountService.getDiscountOffers(queryParam).subscribe((discounts: DiscountOffers) => {
          // Then
          expect(Object.assign({}, discounts)).toEqual(Object.assign({}, expectedResult));
        })
      });
  
      it('should return 3 of 3 discount offers object when server return 3 discounts', () => {
        // Given
        const queryParam = 'isbn1,isbn2';
        const stubDiscount = {
          "offers": [
            { "type": "percentage", "value": 5 },
            { "type": "minus", "value": 15 },
            { "type": "slice", "sliceValue": 100, "value": 12 }
          ]
        };
        httpClientSpy.get.and.returnValue(of(stubDiscount));
        const expectedResult = new DiscountOffers([
          new ClassicDiscount('percentage', 5),
          new ClassicDiscount('minus', 15),
          new SliceDiscount(100, 12)
        ]);
  
        // When
        cartDiscountService.getDiscountOffers(queryParam).subscribe((discounts) => {
          // Then
          expect(Object.assign({}, discounts)).toEqual(Object.assign({}, expectedResult));
        })
      });
      
      describe('When something went wrong', () => {
        it('should return discount offers when queryParam isn\'t empty and server responds', () => {
          // Given
          const queryParam = 'isbn1,isbn2';
          const expectedResult = new DiscountOffers([
            new ClassicDiscount('percentage', 5),
            new ClassicDiscount('minus', 15),
            new SliceDiscount(100, 12)
          ]);
    
          // When
          cartDiscountService.getDiscountOffers(queryParam).subscribe((discounts) => {
            // Then
            expect(discounts).toEqual(expectedResult);
          })
        });

        it('should return an object with empty offers when queryParam list is undefined', () => {
          // Given
          const queryParam = undefined;
          const expectedResult = new DiscountOffers();
    
          // When
          cartDiscountService.getDiscountOffers(queryParam).subscribe((discounts) => {
            // Then
            expect(Object.assign({}, discounts)).toEqual(Object.assign({}, expectedResult));
          })
        });
    
        it('should return an object with empty offers when queryParam list is an empty array', () => {
          // Given
          const queryParam = '';
          const expectedResult = new DiscountOffers();
    
          // When
          cartDiscountService.getDiscountOffers(queryParam).subscribe((discounts) => {
            // Then
            expect(Object.assign({}, discounts)).toEqual(Object.assign({}, expectedResult));
          })
        });
    
        it('should return an empty offers array when server return an empty discounts', () => {
          // Given
          const isbnList = 'isbn1, isbn2';
          const stubDiscount = {
            offers: []
          };
          httpClientSpy.get.and.returnValue(of(stubDiscount));
          const expectedResult = new DiscountOffers()
    
          // When
          cartDiscountService.getDiscountOffers(isbnList).subscribe((discounts) => {
            // Then
            expect(Object.assign({}, discounts)).toEqual(Object.assign({}, expectedResult));
          })
        });
      });
    });

    describe('Backend error', () => {
      it('should return an error when server does not respond', () => {
        // Given
        const queryParam = 'isbn1,isbn2';
        httpClientSpy.get.and.returnValue(throwError(new Error('Server down !')));
  
        // When
        cartDiscountService.getDiscountOffers(queryParam).subscribe(() => {}, (error) => {
          // Then
          expect(error).toEqual(new Error('Server down !'));
        });
      });
    });    
  });
});
