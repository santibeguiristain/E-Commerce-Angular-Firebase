import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsCartComponent } from './list-products-cart.component';

describe('ListProductsCartComponent', () => {
  let component: ListProductsCartComponent;
  let fixture: ComponentFixture<ListProductsCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductsCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductsCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
