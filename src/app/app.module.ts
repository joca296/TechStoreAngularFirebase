import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage"

import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
import { NavbarModule } from './modules/navbar/navbar.module';
import { AppRoutingModule } from './app-routing.module';
import { CreateProductModule } from './modules/create-product/create-product.module';
import { GetProductModule } from './modules/get-product/get-product.module';
import { GetProductsModule } from './modules/get-products/get-products.module';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NavbarModule,
    CreateProductModule,
    GetProductModule,
    GetProductsModule,
    ShoppingCartModule,
    RouterModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
