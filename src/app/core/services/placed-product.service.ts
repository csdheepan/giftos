import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Order } from '../model/product-model';

@Injectable({
  providedIn: 'root'
})
export class PlacedProductService {

  constructor(private afs: AngularFirestore) { }


  getPlacedProduct(id:string):Observable<any>{

    // Get all documents from the 'products' collection and map them to an array of products
    return this.afs.collection('register').doc(id).collection('Placed Product').valueChanges();
  }
}
