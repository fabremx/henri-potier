import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { BookQuantity } from '../../shared/book-quantity';
import { countBy, find } from 'lodash'
import { CartDiscountService } from '../../shared/cart-discount.service';
import { DiscountOffers } from '../../shared/discount-offers';
import { join } from 'lodash'

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit {
  shoppingCart: ShoppingCart;
  bookListWithQuantity: BookQuantity[] = [];
  priceBeforeDiscount: number;
  priceAfterDiscount: number;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private cartDiscountServive: CartDiscountService
  ) { }

  ngOnInit() {
    this.shoppingCart = this.shoppingCartService.getShoppingCart();
    this.bookListWithQuantity = this.getBookListWithQuantity();

    this.priceBeforeDiscount = this.getTotalPriceBeforeDiscount();
    this.getPriceAfterBestDiscount();
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

  getPriceAfterBestDiscount() {
    const booksOccurence = countBy(this.shoppingCart.bookList, 'isbn');
    const isbnList = Object.keys(booksOccurence);
    const queryParam = isbnList ? join(isbnList, ',') : '';

    this.cartDiscountServive.getDiscountOffers(queryParam)
      .subscribe((discountOffers: DiscountOffers) => {
        const pricesAfterDiscount = discountOffers.offers.map(this.calculDiscountPrice);
        this.priceAfterDiscount = Math.min(...pricesAfterDiscount);
      },
      (error) => {
        alert('error');
        console.log(error);
      });
  }

  private calculDiscountPrice = (offer) => {
    switch (offer.type) {
      case 'percentage':
        return this.calculPercentageDiscount(offer.value);
      case 'minus':
        return this.calculMinusDiscount(offer.value);
      case 'slice':
        return this.calculSliceDiscount(offer.value, offer.sliceValue);
    }
  }

  private calculPercentageDiscount(discountValue: number): number {
    return this.priceBeforeDiscount - (this.priceBeforeDiscount * (discountValue / 100));
  }

  private calculMinusDiscount(discountValue: number): number {
    return this.priceBeforeDiscount - discountValue;
  }

  private calculSliceDiscount(discountValue: number, sliceValue: number): number {
    const numberOfSlice = Math.floor(this.priceBeforeDiscount / sliceValue);
    return this.priceBeforeDiscount - (numberOfSlice * discountValue);
  }
}
