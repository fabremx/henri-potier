import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit {
  shoppingCart: ShoppingCart;
  totalPriceBeforeDiscount: number;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.shoppingCart = this.shoppingCartService.getShoppingCart();
    this.totalPriceBeforeDiscount = this.getTotalPriceBeforeDiscount();
  }

  getTotalPriceBeforeDiscount(): number {
    return this.shoppingCart.bookList.reduce((sum, book) => (sum + book.price), 0);
  }
}
