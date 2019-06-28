import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ShoppingCartItem } from '../models/ShoppingCartItem';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private firestore: AngularFirestore,
    private productsService: ProductsService,
    private auth: AuthService
  ) { }

  async addToCart (prodId:string, prodQuant:number, orderQuant:number) {
    let newShoppingCartItem:ShoppingCartItem = {
      id : Math.random().toString(36).replace('0.', ''),
      productId : prodId,
      quantity : orderQuant
    };

    let userId;
    this.auth.loggedInUser.subscribe(user => {
      userId = user.uid;
      const shoppingCartRef:AngularFirestoreDocument<ShoppingCartItem> = this.firestore.doc(`users/${userId}/shoppingCart/${newShoppingCartItem.id}`);

      shoppingCartRef.set(newShoppingCartItem);

      const newQuant:number = prodQuant - orderQuant;
      this.firestore.doc<Product>(`products/${prodId}`).update({ quantity: newQuant });

      alert("Product added to cart");
    });
  }

  getShoppingCart(uid:string):Observable<ShoppingCartItem[]> {
    return this.firestore.collection<ShoppingCartItem>(`users/${uid}/shoppingCart`).valueChanges();
  }

  removeShoppingCartItem(shoppingCartItem:ShoppingCartItem, userId:string) {
    this.productsService.getProduct(shoppingCartItem.productId).pipe(take(1)).subscribe(item => {
      let newQuant:number = item.quantity + shoppingCartItem.quantity;
      this.firestore.doc<Product>(`products/${shoppingCartItem.productId}`).update({ quantity: newQuant });
      this.firestore.doc(`users/${userId}/shoppingCart/${shoppingCartItem.id}`).delete();
    });
  }
}
