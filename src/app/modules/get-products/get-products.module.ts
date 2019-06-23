import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetProductsComponent } from 'src/app/components/get-products/get-products.component';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@NgModule({
  declarations: [
    GetProductsComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    GetProductsComponent
  ]
})
export class GetProductsModule { }
