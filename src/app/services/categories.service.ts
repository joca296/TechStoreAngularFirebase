import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore:AngularFirestore) { }

  getCategories() {
    return this.firestore.collection("categories").valueChanges();
  }

  getSubcategories(catId:string){
    return this.firestore.collection("subcategories", ref => ref.where('categoryId', '==', catId)).valueChanges();
  }
}
