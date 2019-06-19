import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

<<<<<<< HEAD
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
=======
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
>>>>>>> a99490fa7377b15b8308dafe0083c4a07375f1b3
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
