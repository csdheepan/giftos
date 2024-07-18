import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore) {}

  /**
   * Adds a list of products to the Firestore database under the specified user ID.
   * @param allProducts - The list of products to be added.
   * @param id - The unique ID of the user.
   * @returns Observable from the Firestore set operation.
   */
  addProductItem(allProducts: any, id: string) {

    const cartProductsRef = this.afs.collection(`register/${id}/All Products`).doc(id);

    const data = { product: allProducts };

    // Delete existing data and set new data
    return from(cartProductsRef.delete().then(() => cartProductsRef.set(data)));
  }

  /**
   * Retrieves all products from the Firestore database for the specified user ID.
   * @param id - The unique ID of the user.
   * @returns Observable containing an array of products.
   */
  getAllProducts(id: string): Observable<any[]> {
       return this.afs.collection('register').doc(id).collection('All Products').valueChanges();
  }
}