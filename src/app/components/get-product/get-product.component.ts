import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/Product';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css']
})
export class GetProductComponent implements OnInit {
  product:Product;
  imageUrls:Observable<string>[] = new Array<Observable<string>>();
  categoryName:string;
  subcategoryName:string;

  orderQuantity:number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap (params =>
        this.productsService.getProduct(params.get('id'))
      )
    ).subscribe(prod => {
      this.product = prod;
      this.categoriesService.getCategory(prod.categoryId).subscribe(cat => this.categoryName = cat.name);
      this.categoriesService.getSubcategory(prod.subcategoryId).subscribe(subCat => this.subcategoryName = subCat.name);
      prod.pictureLocations.forEach(location => {
        this.imageUrls.push(this.storage.ref(location).getDownloadURL());
      })
    });
  }

}
