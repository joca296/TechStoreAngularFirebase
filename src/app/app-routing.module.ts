import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { GetProductsComponent } from './components/get-products/get-products.component';

const routes:Routes = [
  { path: 'createProduct', component: CreateProductComponent },
  { path: '', component: GetProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
