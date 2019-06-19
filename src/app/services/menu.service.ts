import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private firestore:AngularFirestore) { }

  getMenuItems(){
    return this.firestore.collection("menu").get();
  }
}
