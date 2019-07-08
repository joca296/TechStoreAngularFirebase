import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Product } from 'src/app/models/Product';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() inputProduct:Product;
  product:Product;
  imageURL:Observable<string>;
  categoryName:string;

  constructor(
    private storage:AngularFireStorage,
    private categoriesService:CategoriesService,
    public auth:AuthService,
    private productsService:ProductsService
    ) { }

  ngOnInit() {
    this.product = this.inputProduct;
    this.imageURL = this.storage.ref(this.product.pictureLocations[0]).getDownloadURL();
    this.categoriesService.getCategory(this.product.categoryId).subscribe(cat => this.categoryName = cat.name);
  }

  deleteProduct(productId:string) {
    this.productsService.deleteProduct(productId);
  }

}
