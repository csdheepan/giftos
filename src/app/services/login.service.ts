import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { signUp } from '../model/login-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afs: AngularFirestore) { }

  userSignUp(signUp:signUp) {

    const id = this.afs.createId(); // Generate a ID
    signUp.id = id;

    // Use set to store the data with the  document ID
    this.afs.collection('/register').doc(id).set(signUp);
  }

  getRegisterUser() {
    return this.afs.collection('/register').valueChanges()
  }

}
