import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPictureSliderComponent } from './product-picture-slider.component';

describe('ProductPictureSliderComponent', () => {
  let component: ProductPictureSliderComponent;
  let fixture: ComponentFixture<ProductPictureSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPictureSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPictureSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
