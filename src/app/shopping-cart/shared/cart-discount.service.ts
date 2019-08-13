import { Injectable } from '@angular/core';
import { ApiURLConfig } from 'src/app/configs/apiURL.config';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { join } from 'lodash'

@Injectable()
export class CartDiscountService {

  constructor(private http: HttpClient) { }

  getDiscountOffers(isbnList: string[]): Observable<any> {
    if (!isbnList || !isbnList.length) {
      return of({ offers: []});
    } else {
      const queryParam = join(isbnList, ',');
      return this.http.get(`${ApiURLConfig.baseUrl}/${ApiURLConfig.booksUrl}/${queryParam}/${ApiURLConfig.discountUrl}`);
    }
  }
}
