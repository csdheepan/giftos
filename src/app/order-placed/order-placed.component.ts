import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InMemoryCache } from '../services/cache-services';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss']
})
export class OrderPlacedComponent implements OnInit {


  shippingDetails : any;

  constructor(private router : Router,private store : InMemoryCache){}


  ngOnInit(): void {
 
   this.shippingDetails = JSON.parse(this.store.getItem("SHIPPING_DETAILS"))

  }

  navigateBack(){
   this.router.navigate(['full/products']);
   this.store.removeItem('SHIPPING_DETAILS');
  }
}
