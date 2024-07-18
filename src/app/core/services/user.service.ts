import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) {}

  /**
   * Stores user details in the Firestore database.
   * @param userDetails - The user details to be stored.
   * @param id - The unique ID of the user.
   * @returns Observable from the Firestore set operation.
   */
  userDetails(userDetails: any, id: string) {
    return from(this.afs.collection(`register/${id}/User Details`).doc(id).set(userDetails, { merge: true }));
  }

  /**
   * Retrieves user details from the Firestore database.
   * @param id - The unique ID of the user.
   * @returns Observable containing an array of user details.
   */
  getUserDetails(id: string): Observable<any[]> {
    return this.afs.collection('register').doc(id).collection('User Details').valueChanges();
  }
}
