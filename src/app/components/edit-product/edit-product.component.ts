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
    private route: ActivatedRoute
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
    const data = {
      productName: this.productName,
      categoryId: this.categoryId,
      subcategoryId: this.subcategoryId,
      description: this.description,
      price: this.price
    }
    this.productsService.editProduct(this.productId, data);
  }

  onCategoryChange(categoryId:string) {
    this.categoryService.getSubcategories(categoryId).subscribe(subcategories => this.subcategories = subcategories);
  }

  onChangeQuantitySubmit() {
    if(isNaN(this.quantityMod))
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
