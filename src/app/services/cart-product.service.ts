import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartProductService {

  constructor(private afs: AngularFirestore) { }


  addItem(productList: any, id: string) {

    // Reference to the 'Cart Products' object field under the user's document
    const cartProductsRef = this.afs.collection(`register/${id}/Cart Products`).doc(id);

    const data = { product: productList }

    // Delete existing data and set new data
     cartProductsRef.delete().then(() => {
       cartProductsRef.set(data);
    });

  }

  getCartProducts(id: string): Observable<any[]> {

    // Reference to the 'Cart Products' collection under the document with ID 'id' in the 'register' collection
    const productsCollection: AngularFirestoreCollection<any> = this.afs.collection('register').doc(id).collection('Cart Products');

    // Get all documents from the 'products' collection and map them to an array of products
    return productsCollection.valueChanges();
  }


  placedProduct(productList: any, id: string){

    let docId = this.afs.createId();
    // Reference to the 'Cart Products' object field under the user's document
    const cartProductsRef = this.afs.collection(`register/${id}/Placed Product`).doc(docId);
  
    const data = { product: productList }
  
    cartProductsRef.set(data);

  }


  DeleteCartItem(id: string) : Observable<any> {

    // Reference to the 'Cart Products' object field under the user's document
    const deleteCartRef = this.afs.collection(`register/${id}/Cart Products`).doc(id);

    // Delete existing data
     deleteCartRef.delete();

     // Delete existing data
     const deletePromise = deleteCartRef.delete();

     // Convert the promise to an observable
     return from(deletePromise);
     

  }
}
