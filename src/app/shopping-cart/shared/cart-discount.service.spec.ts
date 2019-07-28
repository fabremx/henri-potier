import { CartDiscountService } from './cart-discount.service';
import { of, throwError } from 'rxjs';

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
    it('should call correct API URL', async () => {
      // Given
      const isbnList = 'isbn1,isbn2';
      const expectedUrl = 'http://henri-potier.xebia.fr/books/isbn1,isbn2/commercialOffers';

      // When
      await cartDiscountService.getDiscountOffers(isbnList);

      // Then
      expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
    });

    it('should return discount when server responding', () => {
      // Given
      const isbnList = 'isbn1,isbn2';
      const expectedResult = stubDiscount;

      // When
      cartDiscountService.getDiscountOffers(isbnList).subscribe((discounts) => {
        // Then
        expect(discounts).toEqual(expectedResult);
      })
    })

    it('should return an error when server isn\'t respond', () => {
      // Given
      const isbnList = 'isbn1,isbn2'; 
      httpClientSpy.get.and.returnValue(throwError(new Error('Server down !')));

      // When
      cartDiscountService.getDiscountOffers(isbnList).subscribe(() => {}, (error) => {
        // Then
        expect(error).toEqual(new Error('Server down !'));
      });
    });

    it('should return an object with empty offers when isbn list is undefined', () => {
      // Given
      const isbnList = undefined;
      const expectedResult = {
        offers: []
      };

      // When
      cartDiscountService.getDiscountOffers(isbnList).subscribe((discounts) => {
        // Then
        expect(discounts).toEqual(expectedResult);
      })
    });
  });
});
