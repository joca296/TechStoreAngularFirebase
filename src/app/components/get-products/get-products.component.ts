import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/Product';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit {
  categories:Observable<any>;
  subcategories:Observable<any>;
  productsOriginal:Product[] = new Array();
  products:Product[] = new Array();

  productName:string = null;
  minPrice:number = null;
  maxPrice:number = null;
  inStock:boolean = false;
  categoryIds:string[] = new Array();
  subcategoryIds:string[] = new Array();

  constructor(
    private titleService:Title,
    public categoriesService:CategoriesService,
    public productsService:ProductsService
    ) {
      this.titleService.setTitle("TechStore");
    }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
    this.subcategories = this.categoriesService.getAllSubcategories();
    this.productsService.getProducts().subscribe(products=> {
      this.productsOriginal = products,
      this.products = products
    });
  }

  inStockToggle() {
    this.inStock = !this.inStock;
  }

  categoryToggle(catId:string) {
    let index = this.categoryIds.indexOf(catId)
    if (index == -1)
      this.categoryIds.push(catId);
    else
      this.categoryIds.splice(index, 1);
  }

  subcategoryToggle(subcatId:string) {
    let index = this.subcategoryIds.indexOf(subcatId)
    if (index == -1)
      this.subcategoryIds.push(subcatId);
    else
      this.subcategoryIds.splice(index, 1);
  }

  onChanged() {
    this.products = this.productsOriginal;

    if(this.productName != null)
      this.products = this.products.filter(product => product.productName.includes(this.productName));

    if (this.minPrice != null)
      this.products = this.products.filter(product => product.price >= this.minPrice);

    if (this.maxPrice != null)
      this.products = this.products.filter(product => product.price <= this.maxPrice);

    if (this.inStock == true)
      this.products = this.products.filter(product => product.quantity > 0);

    if (this.categoryIds.length > 0)
      this.products = this.products.filter(product => {
        let regex = new RegExp(this.categoryIds.join("|"));
        return regex.test(product.categoryId);
      });

    if (this.subcategoryIds.length > 0)
      this.products = this.products.filter(product => {
        let regex = new RegExp(this.subcategoryIds.join("|"));
        return regex.test(product.subcategoryId);
      });
  }
}
