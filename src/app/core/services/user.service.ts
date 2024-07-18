import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  userDetails(userDetails:any,id:string){
    
     // Reference to the 'user Deatils' object field under the  corresponding user
     const userDeatilsRef = this.afs.collection(`register/${id}/User Details`).doc(id);
 
     // storing data
     userDeatilsRef.set(userDetails,{merge:true});
  }

  getUserDetails(id: string): Observable<any[]> {

    // Reference to the 'User Details' collection under the document with ID 'id' in the 'register' collection
    const userDetailsCollection: AngularFirestoreCollection<any> = this.afs.collection('register').doc(id).collection('User Details');

    // Get all documents from the 'products' collection and map them to an array of products
    return userDetailsCollection.valueChanges();
  }


}
