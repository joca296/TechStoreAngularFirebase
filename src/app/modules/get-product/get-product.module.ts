import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetProductComponent } from '../../components/get-product/get-product.component';
import { ProductPictureSliderComponent } from '../../components/product-picture-slider/product-picture-slider.component';
import { FormsModule } from '@angular/forms';
import { ReviewsComponent } from '../../components/reviews/reviews.component';

@NgModule({
  declarations: [GetProductComponent, ProductPictureSliderComponent, ReviewsComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    GetProductComponent
  ]
})
export class GetProductModule { }
