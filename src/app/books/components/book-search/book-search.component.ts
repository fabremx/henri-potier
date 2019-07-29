import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  @Input() books: Book[];
  @Output() searchEmitter = new EventEmitter<string>();

  userSearch: string;

  constructor() { }

  ngOnInit() { }

  search(search: string): void {
    this.searchEmitter.emit(search);
  }
}
