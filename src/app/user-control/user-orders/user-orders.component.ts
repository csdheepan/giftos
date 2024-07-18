import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/model/placed-product-model';
import { PlacedProductService } from 'src/app/core/services/placed-product.service';
import { InMemoryCache } from 'src/app/shared/services/memory-cache';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent  implements OnInit{


  orders: Order[] = [];
  userDetail : any;
 
  constructor(private placedProductService : PlacedProductService,private store : InMemoryCache,private router : Router){}

  ngOnInit(): void {

    this.userDetail = JSON.parse(this.store.getItem('USER_DETAILS'));

    this.placedProductService.getPlacedProduct(this.userDetail.id).subscribe((data:Order[])=>{
      this.orders = data;
    })
  }

  navigateToProducts(){
    this.router.navigate(['user/full/products'])
  }
}
