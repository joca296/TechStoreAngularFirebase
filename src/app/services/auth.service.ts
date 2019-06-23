import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { User } from '../models/User';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: Observable<User>;

  constructor(
    private firebaseAuth:AngularFireAuth,
    private firestore:AngularFirestore,
    private router:Router
  ) {
    this.loggedInUser = this.firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.firebaseAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef:AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: {
        subscriber: true,
      }
    }

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.firebaseAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  async isAuthenticated() {
    let result:boolean;
    let user = this.loggedInUser.pipe(take(1)).toPromise();
    await user.then(user => {
      if (user == null)
        result = false;
      else
        result = true;
    });
    return result;
  }

  async isAdmin() {
    let result:boolean;
    let user = this.loggedInUser.pipe(take(1)).toPromise();
    await user.then(user => {
      if (user == null)
        result = false;
      else
        result = user.role.admin;
    });
    return result;
  }
}
