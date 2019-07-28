import { Injectable } from '@angular/core';
import { ApiURLConfig } from 'src/app/configs/apiURL.config';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartDiscountService {

  constructor(private http: HttpClient) { }

  getDiscountOffers(isbnList: string): Observable<any> {
    if (!isbnList) {
      return of({ offers: []});
    } else {
      return this.http.get(`${ApiURLConfig.baseUrl}/${ApiURLConfig.booksUrl}/${isbnList}/${ApiURLConfig.discountUrl}`);
    }
  }
}
