import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  categories:Observable<any>;
  subcategories:Observable<any>;

  productName:string;
  categoryId:string;
  subcategoryId:string;
  description:string;
  price:number;
  quantity:number;
  files:File[];

  constructor(
    public categoriesService:CategoriesService,
    public productsService:ProductsService
    ) { }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
  }

  onFilesAdded(files: File[]){
    this.files = files;
  }

  onSubmit(){
    //validate here

    let newProduct = {
      productName : this.productName,
      categoryId : this.categoryId,
      subcategoryId : this.subcategoryId,
      description : this.description,
      price : this.price,
      quantity : this.quantity
    }

    if(this.productsService.addProduct(newProduct, this.files)) {
      alert("Product inserted");
      location.reload();
    }
  }
}
