import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetShoppingCartComponent } from './get-shopping-cart.component';

describe('GetShoppingCartComponent', () => {
  let component: GetShoppingCartComponent;
  let fixture: ComponentFixture<GetShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetShoppingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
