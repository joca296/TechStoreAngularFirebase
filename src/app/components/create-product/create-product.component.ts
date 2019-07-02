import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Title } from '@angular/platform-browser';
import { Alert } from 'src/app/models/Alert';
import { AlertService } from 'src/app/services/alert.service';
import { isNullOrUndefined } from 'util';

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
    public productsService:ProductsService,
    private titleService:Title,
    public alert:AlertService
    ) {
      this.titleService.setTitle("TechStore - Create Product");
    }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
  }

  onFilesAdded(files: File[]){
    this.files = files;
  }

  onFilesReset() {
    this.files = null;
  }

  onSubmit() {
    this.alert.clearMessages();

    let newProduct = {
      productName : this.productName,
      categoryId : this.categoryId,
      subcategoryId : this.subcategoryId,
      description : this.description,
      price : this.price,
      quantity : this.quantity
    }

    let isOk:boolean = true;

    if (isNullOrUndefined(this.productName) || this.productName == "") {
      this.alert.addMessage("Product name must not be empty.");
      isOk = false;
    }

    if (isNullOrUndefined(this.categoryId)) {
      this.alert.addMessage("Category must not be empty.");
      isOk = false;
    }

    if (isNullOrUndefined(this.subcategoryId)) {
      this.alert.addMessage("Subcategory must not be empty.");
      isOk = false;
    }

    if (isNullOrUndefined(this.description) || this.description == "") {
      this.alert.addMessage("Category must not be empty.");
      isOk = false;
    }

    if (isNullOrUndefined(this.price)) {
      this.alert.addMessage("Price must not be empty.");
      isOk = false;
    }
    else
      if (this.price <= 0) {
      this.alert.addMessage("Invalid price format.");
      isOk = false;
    }

    if (isNullOrUndefined(this.quantity)) {
      this.alert.addMessage("Quantity must not be empty.");
      isOk = false;
    }
    else
      if (this.quantity < 0) {
      this.alert.addMessage("Invalid quantity format.");
      isOk = false;
    }

    if (isNullOrUndefined(this.files)) {
      this.alert.addMessage("At least one image must be uploaded.");
      isOk = false;
    }

    if (isOk)
      this.productsService.addProduct(newProduct, this.files);
    else {
      this.alert.setType("danger");
      this.alert.setHeading("Errors");
      alert("Errors have occured.");
    }
  }
}
