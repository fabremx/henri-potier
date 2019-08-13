import { NgModule } from '@angular/core';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartListComponent } from './pages/shopping-cart-list/shopping-cart-list.component';
import { ShoppingCartItemComponent } from './components/shopping-cart-item/shopping-cart-item.component';
import { CartDiscountService } from './shared/cart-discount.service';

@NgModule({
  imports: [
    ShoppingCartRoutingModule,
    SharedModule
  ],
  declarations: [
    ShoppingCartListComponent,
    ShoppingCartItemComponent
  ],
  providers: [
    CartDiscountService
  ]
})

export class ShoppingCartModule { }
