import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
import { NavbarModule } from './modules/navbar/navbar.module';
import { AppRoutingModule } from './app-routing.module';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { GetProductsComponent } from './components/get-products/get-products.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateProductComponent,
    GetProductsComponent
  ],
  imports: [
    BrowserModule,
    NavbarModule,
    RouterModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
