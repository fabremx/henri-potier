import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { BookQuantity } from '../../shared/book-quantity';
import { countBy, find, join } from 'lodash'
import { CartDiscountService } from '../../shared/cart-discount.service';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit {
  shoppingCart: ShoppingCart;
  discounts: any;
  bookListWithQuantity: BookQuantity[] = [];
  totalPriceBeforeDiscount: number;

  constructor(private shoppingCartService: ShoppingCartService,
    private cartDiscountServive: CartDiscountService) { }

  ngOnInit() {
    this.shoppingCart = this.shoppingCartService.getShoppingCart();
    this.discounts = this.getBooksDiscount();
    this.totalPriceBeforeDiscount = this.getTotalPriceBeforeDiscount();
    this.bookListWithQuantity = this.getBookListWithQuantity();
  }

  getTotalPriceBeforeDiscount(): number {
    return this.shoppingCart.bookList.reduce((sum, book) => (sum + book.price), 0);
  }

  getBookListWithQuantity(): BookQuantity[] {
    const booksQuantity = []
    const booksOccurence = countBy(this.shoppingCart.bookList, 'isbn');
    const isbnList = Object.keys(booksOccurence);
    
    isbnList.forEach((isbn) => {
      booksQuantity.push({
        book: find(this.shoppingCart.bookList, ['isbn', isbn]),
        quantity: booksOccurence[isbn]
      })
    });
  
    return booksQuantity;
  }

  getBooksDiscount() {
    const booksOccurence = countBy(this.shoppingCart.bookList, 'isbn');
    const isbnList = Object.keys(booksOccurence);
    this.cartDiscountServive.getDiscount(join(isbnList, ',')).subscribe((discount) => {
      console.log('DISCOUNT', discount);
    },
    (error) => {
      alert('error');
    })
  }
}
