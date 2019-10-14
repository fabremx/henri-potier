import { Injectable } from '@angular/core';
import { ApiURLConfig } from 'src/app/configs/apiURL.config';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DiscountOffers, ClassicDiscount, SliceDiscount } from './discount-offers';
import { map } from 'rxjs/operators';

@Injectable()
export class CartDiscountService {

  constructor(private http: HttpClient) { }

  getDiscountOffers(queryParam: string): Observable<DiscountOffers> {
    if (!queryParam) {
      return of(new DiscountOffers());
    } 
    
    return this.http.get(`${ApiURLConfig.baseUrl}/${ApiURLConfig.booksUrl}/${queryParam}/${ApiURLConfig.discountUrl}`)
    .pipe(
      map((discounts: Object) => {
        const discountsArray: Array<ClassicDiscount|SliceDiscount> = this.getDiscountsObjectFromBackendResponse(discounts)
        return new DiscountOffers(discountsArray)
      })
    );
  }

  private getDiscountsObjectFromBackendResponse(discounts: Object): Array<ClassicDiscount|SliceDiscount> {
    return discounts['offers'].map(discount => {
      switch (discount.type) {
        case 'percentage':
        case 'minus':
          return new ClassicDiscount(discount.type, discount.value)
        case 'slice':
          return new SliceDiscount(discount.sliceValue, discount.value)
      }
    });
  }
}
