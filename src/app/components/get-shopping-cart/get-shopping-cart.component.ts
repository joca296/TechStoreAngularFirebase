import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from 'src/app/models/ShoppingCartItem';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCartItemExtended } from 'src/app/models/ShoppingCartItemExtended';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-get-shopping-cart',
  templateUrl: './get-shopping-cart.component.html',
  styleUrls: ['./get-shopping-cart.component.css']
})
export class GetShoppingCartComponent implements OnInit {
  shoppingCartItems:ShoppingCartItemExtended[] = new Array<ShoppingCartItemExtended>();
  total:number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService,
    private titleService: Title
  ) {
    titleService.setTitle("TechStore - Shopping Cart")
  }

  ngOnInit() {
    this.auth.loggedInUser.subscribe(user => {
      this.shoppingCartService.getShoppingCart(user.uid).subscribe(items => {
        this.shoppingCartItems = items;
        this.total = 0;
        items.forEach(item => this.total+=item.price);
      });
    });
  }

  removeFromCart(shoppingCartItem:ShoppingCartItem) {
    this.auth.loggedInUser.subscribe(user => {
      this.shoppingCartService.removeShoppingCartItem(shoppingCartItem,user.uid);
    });
  }

}
