import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlacedProductService {

  constructor(private afs: AngularFirestore) { }


  getPlacedProduct(id:string){

    // Reference to the 'Placed Products' collection under the document with ID 'id' in the 'register' collection
    const placedProductCollection: AngularFirestoreCollection<any> = this.afs.collection('register').doc(id).collection('Placed Product');

    // Get all documents from the 'products' collection and map them to an array of products
    return placedProductCollection.valueChanges();
  }
}
