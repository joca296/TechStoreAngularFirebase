import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';
import { SubCategory } from 'src/app/models/SubCategory';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Image } from 'src/app/models/Image';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  categories:Category[] = new Array<Category>();
  subcategories:SubCategory[] = new Array<SubCategory>();

  productId:string;
  productName:string;
  categoryId:string;
  subcategoryId:string;
  description:string;
  price:number;
  quantity:number;
  images:Image[];

  files:File[];
  quantityMod:number;
  picturesForRemoval:string[] = new Array<string>();

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoriesService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap (params =>
        this.productsService.getProduct(params.get('id'))
      )
    ).subscribe(product => {
      this.productId = product.id;
      this.productName = product.productName;
      this.categoryId = product.categoryId;
      this.subcategoryId = product.subcategoryId;
      this.description = product.description;
      this.price = product.price;
      this.quantity = product.quantity;
      this.images = new Array<Image>();
      product.pictureLocations.forEach(picture => {
        this.storage.ref(picture).getDownloadURL().subscribe(url => {
          this.images.push({
            location : picture,
            url : url
          });
        });
      })
      this.categoryService.getCategories().subscribe(categories => this.categories = categories);
      this.categoryService.getSubcategories(product.categoryId).subscribe(subcategories => this.subcategories = subcategories);
    })
  }

  onSubmit() {
    this.alert.clearMessages();

    const data = {
      productName: this.productName,
      categoryId: this.categoryId,
      subcategoryId: this.subcategoryId,
      description: this.description,
      price: this.price
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

    if (isOk)
      this.productsService.editProduct(this.productId, data);
    else {
      this.alert.setType("danger");
      this.alert.setHeading("Errors");
      alert("Errors have occured.");
    }
  }

  onCategoryChange(categoryId:string) {
    this.categoryService.getSubcategories(categoryId).subscribe(subcategories => this.subcategories = subcategories);
    this.subcategoryId=null;
  }

  onChangeQuantitySubmit() {
    if(isNaN(this.quantityMod) || (this.quantity + this.quantityMod) < 0)
      alert("Invalid quantity.");
    else
      this.productsService.updateProductQuantity(this.productId, (this.quantity + this.quantityMod));
  }

  onFilesAdded(files: File[]){
    this.files = files;
  }

  onFilesReset() {
    this.files = null;
  }

  onAddPicturesSubmit() {
    if (isNullOrUndefined(this.files))
      alert("No files have been uploaded");
    else
      this.productsService.addProductPictures(this.productId, this.files);
  }

  onRemovePictureToggle(pictureLocation:string) {
    let i = this.picturesForRemoval.indexOf(pictureLocation);
    if (i == -1)
      this.picturesForRemoval.push(pictureLocation);
    else
      this.picturesForRemoval.splice(i,1);
  }

  onRemovePicturesSubmit() {
    if (this.picturesForRemoval.length == 0)
      alert("No pictures selected");
    else
      this.productsService.removeProductPictures(this.productId, this.picturesForRemoval);
  }
}
