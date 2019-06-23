import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from '../models/Product';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private firestore:AngularFirestore,
    private storage:AngularFireStorage
    ) { }

  getProducts():Observable<Product[]>{
    return this.firestore.collection<Product>("products").valueChanges();
  }

  getProduct(productId:string):Observable<Product> {
    return this.firestore.doc<Product>(`products/${productId}`).valueChanges();
  }

  addProduct(newProduct:Product, files:File[]):boolean {
    newProduct.pictureLocations = new Array();

    files.forEach(file => {
      const filePath:string = `uploads/${Date.now()}`+file.name;
      this.storage.upload(filePath, file);
      newProduct.pictureLocations.push(filePath);
    });

    newProduct.id = Math.random().toString(36).replace('0.', '');

    const productRef:AngularFirestoreDocument<Product> = this.firestore.doc(`products/${newProduct.id}`);

    productRef.set(newProduct);

    return true;
  }
}
