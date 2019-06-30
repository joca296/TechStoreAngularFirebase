import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductsService } from './products.service';
import { Review } from '../models/Review';
import { Observable } from 'rxjs';
import { ReviewExtended } from '../models/ReviewExtended';
import { leftJoinDocument } from '../collectionJoin';
import { map } from 'rxjs/operators';

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

  getReviews(productId:string):Observable<ReviewExtended[]> {
    return this.firestore.collection<Review>(`products/${productId}/reviews`, ref=> ref.orderBy('dateCreated','desc')).valueChanges().pipe(
      leftJoinDocument(this.firestore, 'userId', 'users'),
      map((reviews:any[]) => {
        return reviews.map(review => {
          return {
            userId : review.userId.uid,
            dateCreated : review.dateCreated,
            comment : review.comment,
            displayName : review.userId.displayName,
            photoURL : review.userId.photoURL
          }
        })
      })
    )
  }
}
