import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Product } from 'src/app/models/Product';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

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
  subcategoryName:string;

  constructor(
    public storage:AngularFireStorage,
    public categoriesService:CategoriesService
    ) { }

  ngOnInit() {
    this.product = this.inputProduct;
    this.imageURL = this.storage.ref(this.product.pictureLocations[0]).getDownloadURL();
    this.categoriesService.getCategory(this.product.categoryId).subscribe(cat => this.categoryName = cat.name);
    this.categoriesService.getSubcategory(this.product.subcategoryId).subscribe(subCat => this.subcategoryName = subCat.name);
  }

}
