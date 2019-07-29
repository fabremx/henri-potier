import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Book } from 'src/app/books/shared/book';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nbItemsInShoppingCart: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.shoppingCartService.getShoppingCartChange()
      .subscribe((books: Book[]) => {
        this.nbItemsInShoppingCart = books.length;
      },
      () => {
        console.error('error');
      });
  }
}
