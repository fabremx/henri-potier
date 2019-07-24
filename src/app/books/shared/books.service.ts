import { Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { map, toArray, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get('http://henri-potier.xebia.fr/books')
      .pipe(
        map((books: Array<object>) => {
          return books.map((book) => new Book(book))
        })
      );
  }
}