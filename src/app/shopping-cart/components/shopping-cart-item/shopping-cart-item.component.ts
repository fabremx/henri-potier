import { Component, OnInit, Input } from '@angular/core';
import { BookQuantity } from '../../shared/book-quantity';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() bookWithQuantity: BookQuantity;

  constructor() { }

  ngOnInit() {
  }

}
