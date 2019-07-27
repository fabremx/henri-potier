import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartItemComponent } from './shopping-cart-item.component';
import { RouterModule } from '@angular/router';

describe('ShoppingCartItemComponent', () => {
  let component: ShoppingCartItemComponent;
  let fixture: ComponentFixture<ShoppingCartItemComponent>;

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
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
