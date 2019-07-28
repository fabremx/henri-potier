import { Injectable } from '@angular/core';
import { ApiURLConfig } from 'src/app/configs/apiURL.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartDiscountService {

  constructor(private http: HttpClient) { }

  getDiscount(isbnList: string): Observable<any> {
    return this.http.get(`${ApiURLConfig.baseUrl}/${ApiURLConfig.booksUrl}/${isbnList}/${ApiURLConfig.discountUrl}`);
  }
}
