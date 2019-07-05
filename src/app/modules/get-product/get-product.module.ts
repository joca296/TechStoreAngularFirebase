import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetProductComponent } from '../../components/get-product/get-product.component';
import { ProductPictureSliderComponent } from '../../components/product-picture-slider/product-picture-slider.component';
import { FormsModule } from '@angular/forms';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { ReviewComponent } from '../../components/review/review.component';
import { AlertModule } from '../alert/alert.module';

@NgModule({
  declarations: [GetProductComponent, ProductPictureSliderComponent, ReviewsComponent, ReviewComponent],
  imports: [
    CommonModule,
    AlertModule,
    FormsModule
  ],
  exports: [
    GetProductComponent
  ]
})
export class GetProductModule { }
