import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';
import { SubCategory } from '../models/SubCategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore:AngularFirestore) { }

  getCategories():Observable<Category[]> {
    return this.firestore.collection<Category>("categories").valueChanges();
  }

  getCategory(catId:string):Observable<Category> {
    return this.firestore.doc<Category>(`categories/${catId}`).valueChanges();
  }

  getSubcategories(catId:string):Observable<SubCategory[]> {
    return this.firestore.collection<SubCategory>("subcategories", ref => ref.where('categoryId', '==', catId)).valueChanges();
  }

  getAllSubcategories():Observable<SubCategory[]> {
    return this.firestore.collection<SubCategory>("subcategories").valueChanges();
  }

  getSubcategory(subCatId:string):Observable<SubCategory> {
    return this.firestore.doc<SubCategory>(`subcategories/${subCatId}`).valueChanges();
  }
}
