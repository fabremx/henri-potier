import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartItemComponent } from './shopping-cart-item.component';
import { RouterModule } from '@angular/router';
import { Book } from 'src/app/books/shared/book';

describe('ShoppingCartItemComponent', () => {
  let component: ShoppingCartItemComponent;
  let fixture: ComponentFixture<ShoppingCartItemComponent>;

  const stubBookQuantity = {
    book: new Book({
      isbn: 'isbn1',
      title: 'title 1',
      price: 10,
      cover: 'cover1',
      synopsis: ['this', 'is', 'a', 'synopsis']
    }),
    quantity: 2
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartItemComponent ],
      imports: [ RouterModule.forRoot([]) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartItemComponent);
    component = fixture.componentInstance;
    component.bookWithQuantity = stubBookQuantity;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
