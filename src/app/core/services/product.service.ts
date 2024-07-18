import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore) { }


  addProductItem(allProducts: any, id: string) {

    // Reference to the 'Cart Products' object field under the user's document
    const cartProductsRef = this.afs.collection(`register/${id}/All Products`).doc(id);

    const data = { product: allProducts }

    // Delete existing data and set new data
     cartProductsRef.delete().then(() => {
       cartProductsRef.set(data);
    });

  }

  getAllProducts(id: string): Observable<any[]> {

    // Reference to the 'Cart Products' collection under the document with ID 'id' in the 'register' collection
    const productsCollection: AngularFirestoreCollection<any> = this.afs.collection('register').doc(id).collection('All Products');

    // Get all documents from the 'products' collection and map them to an array of products
    return productsCollection.valueChanges();
  }


}



