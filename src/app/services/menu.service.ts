import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private firestore:AngularFirestore) { }

  getMenuItems():Observable<MenuItem[]> {
    return this.firestore.collection<MenuItem>("menu").valueChanges();
  }
}
