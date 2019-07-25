import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  
  constructor() { }

  ngOnInit() {
  }

}
