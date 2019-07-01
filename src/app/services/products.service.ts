import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from '../models/Product';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ReviewsService } from './reviews.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private firestore:AngularFirestore,
    private storage:AngularFireStorage,
    private reviewsService:ReviewsService,
    private router: Router
    ) { }

  getProducts():Observable<Product[]>{
    return this.firestore.collection<Product>("products").valueChanges();
  }

  getProduct(productId:string):Observable<Product> {
    return this.firestore.doc<Product>(`products/${productId}`).valueChanges();
  }

  addProduct(newProduct:Product, files:File[]) {
    newProduct.pictureLocations = new Array();

    files.forEach(file => {
      const filePath:string = `uploads/${Date.now()}`+file.name;
      this.storage.upload(filePath, file);
      newProduct.pictureLocations.push(filePath);
    });

    newProduct.id = Math.random().toString(36).replace('0.', '');

    const productRef = this.firestore.doc<Product>(`products/${newProduct.id}`);

    productRef.set(newProduct);

    alert("Product inserted");
    this.router.navigate(['/']);
  }

  deleteProduct(productId:string) {
    this.getProduct(productId).subscribe(product => {
      product.pictureLocations.forEach(image => this.storage.ref(image).delete());
    });
    this.reviewsService.clearReviews(productId);
    this.firestore.doc<Product>(`products/${productId}`).delete();
  }
}
