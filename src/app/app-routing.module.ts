import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { GetProductsComponent } from './components/get-products/get-products.component';
import { AdminGuardService } from './services/auth_guards/admin-guard.service';
import { GetProductComponent } from './components/get-product/get-product.component';

const routes:Routes = [
  { path: 'createProduct', component: CreateProductComponent, canActivate: [AdminGuardService] },
  { path: 'product/:id', component: GetProductComponent },
  { path: '', component: GetProductsComponent },
  { path: '**', redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
