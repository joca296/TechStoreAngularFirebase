import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditProductComponent } from '../../components/edit-product/edit-product.component';

@NgModule({
  declarations: [EditProductComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [EditProductComponent]
})
export class EditProductModule { }
