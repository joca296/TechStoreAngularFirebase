import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit {
  categories:Observable<any>;
  subcategories:Observable<any>;
  products:Observable<Product[]>;

  productName:string;
  minPrice:number;
  maxPrice:number;
  inStock:boolean = true;

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
    this.products = this.productsService.getProducts();
  }

  inStockToggle() {
    this.inStock = !this.inStock;
  }
}
