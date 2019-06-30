import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductsService } from './products.service';
import { Review } from '../models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  createReview(userId:string, productId:string, comment:string) {
    const newReview:Review = {
      userId : userId,
      comment : comment,
      dateCreated : Date.now()
    }

    const reviewRef = this.firestore.doc<Review>(`products/${productId}/reviews/${userId}`);

    reviewRef.get().subscribe(review => {
      if (review.exists) {
        alert ("You have already left a review on this product.");
      }
      else {
        reviewRef.set(newReview);
        alert ("Review successfully created.");
      }
    });
  }
}
