import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from 'src/app/models/ShoppingCartItem';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-get-shopping-cart',
  templateUrl: './get-shopping-cart.component.html',
  styleUrls: ['./get-shopping-cart.component.css']
})
export class GetShoppingCartComponent implements OnInit {
  shoppingCartItems:ShoppingCartItem[] = new Array<ShoppingCartItem>();
  productNames:string[] = new Array<string>();

  constructor(
    private auth: AuthService,
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.auth.loggedInUser.subscribe(user => {
      this.shoppingCartService.getShoppingCart(user.uid).subscribe(items => {
        this.shoppingCartItems = items;
        items.forEach(item => {
          this.productsService.getProduct(item.productId).subscribe(product => {
            this.productNames.push(product.productName);
          });
        });
      });
    });
  }

  removeFromCart(shoppingCartItem:ShoppingCartItem) {
    this.auth.loggedInUser.subscribe(user => {
      this.shoppingCartService.removeShoppingCartItem(shoppingCartItem,user.uid);
    });
  }

}
