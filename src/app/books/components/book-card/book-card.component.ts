import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../shared/book';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {}

  addBookToShoppingCart(book: Book): void {
    this.shoppingCartService.addBookToShoppingCart(book);
  }
}
