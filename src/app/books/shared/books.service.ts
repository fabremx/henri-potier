import { Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiURLConfig } from 'src/app/configs/apiURL.config';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get(`${ApiURLConfig.baseUrl}/${ApiURLConfig.booksUrl}`)
      .pipe(
        map((books: Array<object>) => {
          return books.map((book) => new Book(book))
        })
      );
  }

  getBook(isbn: string): Observable<Book> {
    return this.http.get(`${ApiURLConfig.baseUrl}/${ApiURLConfig.booksUrl}`)
      .pipe(
        map((books: Array<object>) => { 
          const book = books.filter((book) => book['isbn'] === isbn)[0]; 
          return book ? new Book(book) : null; 
        })
      );
  }
}