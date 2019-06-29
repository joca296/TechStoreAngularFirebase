import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCartItemExtended } from '../models/ShoppingCartItemExtended';
import { PurchaseHistory } from '../models/PurchaseHistory';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
    private shoppingCartService: ShoppingCartService
  ) { }

  createPurchase(shoppingCart:ShoppingCartItemExtended[], total:number) {
    const date = new Date();

    const newPurchase:PurchaseHistory = {
      id : Math.random().toString(36).replace('0.', ''),
      itemsPurchased: shoppingCart,
      total: total,
      dateOfPurchase: date.toUTCString()
    }

    this.auth.loggedInUser.subscribe(user => {
      const purchaseHistoryRef = this.firestore.doc<PurchaseHistory>(`users/${user.uid}/purchaseHistory/${newPurchase.id}`);
      purchaseHistoryRef.set(newPurchase);
      this.shoppingCartService.clearShoppingCart(shoppingCart, user.uid);
      alert("Items successfully purchased and added to history");
    });
  }
}
