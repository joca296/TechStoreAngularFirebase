import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from 'src/app/components/create-product/create-product.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';
import { AlertModule } from '../alert/alert.module';


@NgModule({
  declarations: [
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    FormsModule,
    AlertModule
  ],
  exports: [
    CreateProductComponent
  ]
})
export class CreateProductModule { }
