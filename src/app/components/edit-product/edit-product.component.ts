import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';
import { SubCategory } from 'src/app/models/SubCategory';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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

  quantityMod:number;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoriesService,
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
}
