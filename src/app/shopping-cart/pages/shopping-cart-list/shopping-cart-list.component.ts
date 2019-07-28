import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { BookQuantity } from '../../shared/book-quantity';
import { countBy, find, join, min } from 'lodash'
import { CartDiscountService } from '../../shared/cart-discount.service';
import { DiscountOffers } from '../../shared/discount-offers';

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

  constructor(private shoppingCartService: ShoppingCartService,
    private cartDiscountServive: CartDiscountService) { }

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
    const discountPriceList: Array<number> = []
    const booksOccurence = countBy(this.shoppingCart.bookList, 'isbn');
    const isbnList = Object.keys(booksOccurence);

    this.cartDiscountServive.getDiscountOffers(join(isbnList, ','))
      .subscribe((discountOffers: DiscountOffers) => {
        discountOffers.offers.forEach(offer => {
          let priceAfterDiscount;
          let discountInfo

          switch (offer.type) {
            case 'percentage':
              discountInfo = find(discountOffers.offers, ['type', 'percentage']);
              priceAfterDiscount = this.calculPercentageDiscount(discountInfo);
              break;
            case 'minus':
              discountInfo = find(discountOffers.offers, ['type', 'minus']);
              priceAfterDiscount = this.calculMinusDiscount(discountInfo);
              break;
            case 'slice':
              discountInfo = find(discountOffers.offers, ['type', 'slice']);
              priceAfterDiscount = this.calculSliceDiscount(discountInfo);
              break;
          }

          discountPriceList.push(priceAfterDiscount);
        });

        this.priceAfterDiscount = min(discountPriceList);
      },
      (error) => {
        alert('error');
      });
  }

  private calculPercentageDiscount(discountInfo) {
    return this.priceBeforeDiscount - (this.priceBeforeDiscount * (discountInfo.value / 100));
  }

  private calculMinusDiscount(discountInfo) {
    return this.priceBeforeDiscount - discountInfo.value
  }

  private calculSliceDiscount(discountInfo) {
    const numberOfSlice = Math.floor(this.priceBeforeDiscount / discountInfo.sliceValue);
    return this.priceBeforeDiscount - (numberOfSlice * discountInfo.value);
  }
}
