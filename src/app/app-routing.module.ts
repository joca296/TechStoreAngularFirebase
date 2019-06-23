import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { GetProductsComponent } from './components/get-products/get-products.component';
import { AdminGuardService } from './services/auth_guards/admin-guard.service';

const routes:Routes = [
  { path: 'createProduct', component: CreateProductComponent, canActivate: [AdminGuardService] },
  { path: '', component: GetProductsComponent },
  { path: '**', component: GetProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
