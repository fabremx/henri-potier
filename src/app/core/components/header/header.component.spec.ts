import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { of, throwError } from 'rxjs';
import { Book } from 'src/app/books/shared/book';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const stubShoppingCart = [new Book(), new Book()];

  let shoppingCartServiceSpy = jasmine.createSpyObj('ShoppingCartService', ['getShoppingCartChange']);;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ RouterModule.forRoot([]) ],
      providers: [ {provide: ShoppingCartService, useValue: shoppingCartServiceSpy} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    shoppingCartServiceSpy.getShoppingCartChange.and.returnValue(of(stubShoppingCart))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('ngOnInit', () => {
    it('should set the number of books present in the shopping cart when shopping cart is updated', async () => {
      // Given
      const expectedResult = 2;
      
      // When
      component.ngOnInit();

      // Then
      expect(component.nbItemsInShoppingCart).toEqual(expectedResult);
    });

    it('should log error when error occur during shopping cart updating', () => {
      // Given
      shoppingCartServiceSpy.getShoppingCartChange.and.returnValue(throwError('error'))
      spyOn(console, 'error');
      
      // When
      component.ngOnInit();

      // Then
      expect(console.error).toHaveBeenCalledWith('error');
    });
  })
});
