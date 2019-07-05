import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetShoppingCartComponent } from '../../components/get-shopping-cart/get-shopping-cart.component';
import { FormsModule } from '@angular/forms';
import { AlertModule } from '../alert/alert.module';

@NgModule({
  declarations: [GetShoppingCartComponent],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule
  ],
  exports : [GetShoppingCartComponent]
})
export class ShoppingCartModule { }
