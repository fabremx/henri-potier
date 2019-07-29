import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardComponent } from './book-card.component';
import { RouterModule } from '@angular/router';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let instance;

  const shoppingCartServiceSpy = jasmine.createSpyObj('ShoppingCartService', ['addBookToShoppingCart']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCardComponent ],
      imports: [ RouterModule.forRoot([]) ],
      providers: [{ provide: ShoppingCartService, useValue: shoppingCartServiceSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    instance = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addBookToShoppingCart', () => {
    xit('should render the Add to shopping cart button', async(() => {
      spyOn(component, 'addBookToShoppingCart');
      fixture.detectChanges();
      let button = instance.querySelector('#btn-add-to-cart');
      expect(button).toBeTruthy();
    }));

    xit('should call addBookToShoppingCart function', async(() => {
      spyOn(component, 'addBookToShoppingCart');
      fixture.detectChanges();
      let button = instance.querySelector('#btn-add-to-cart');
      button.click();
      fixture.detectChanges();
      expect(component.addBookToShoppingCart).toHaveBeenCalled();
      expect(shoppingCartServiceSpy.addBookToShoppingCart).toHaveBeenCalled();
    }));
  });
});
