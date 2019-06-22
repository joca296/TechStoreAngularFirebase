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
import { GetProductsComponent } from './components/get-products/get-products.component';
import { CreateProductModule } from './modules/create-product/create-product.module';


@NgModule({
  declarations: [
    AppComponent,
    GetProductsComponent,
  ],
  imports: [
    BrowserModule,
    NavbarModule,
    CreateProductModule,
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
