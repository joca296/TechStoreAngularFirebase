import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditProductComponent } from '../../components/edit-product/edit-product.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AlertModule } from '../alert/alert.module';

@NgModule({
  declarations: [
    EditProductComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    FormsModule,
    AlertModule
  ],
  exports: [EditProductComponent]
})
export class EditProductModule { }
