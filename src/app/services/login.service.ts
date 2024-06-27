import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SignUp } from '../model/login-model';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly collectionPath = '/register';

  constructor(private afs: AngularFirestore) { }

  /**
   * Registers a new user by storing their information in Firestore.
   * @param signUpData - The user data to be registered.
   * @returns An Observable that completes when the user data has been stored.
   */
  userSignUp(signUpData: SignUp): Observable<void> {
    const id = this.afs.createId();
    signUpData.id = id;

    return from(this.afs.collection(this.collectionPath).doc(id).set(signUpData))
  }

  /**
   * Retrieves all registered users from Firestore.
   * @returns An Observable containing an array of user data.
   */
  getRegisterUser(): Observable<SignUp[]> {
    return this.afs.collection<SignUp>(this.collectionPath).valueChanges();
  }
}
