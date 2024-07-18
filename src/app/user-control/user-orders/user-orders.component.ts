import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/model/product-model';
import { PlacedProductService } from 'src/app/core/services/placed-product.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { InMemoryCache } from 'src/app/shared/services/memory-cache';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent  implements OnInit{


  orders: Order[] = [];
  userDetail : any;
  showNoOrders:boolean= false;
 
  constructor(
    private placedProductService : PlacedProductService,
    private store : InMemoryCache,
    private router : Router,
    private errorHandlerService: ErrorHandlerService
  ){}

  ngOnInit(): void {

    this.userDetail = JSON.parse(this.store.getItem('USER_DETAILS'));

    this.placedProductService.getPlacedProduct(this.userDetail.id).subscribe((data:any)=>{
      this.orders = data;
      this.showNoOrders = this.orders.length == 0 ? true : false;
    },
    err => this.errorHandlerService.handleErrors(err, "retrieving  placed products"))
  }

  navigateToProducts(){
    this.router.navigate(['user/full/products'])
  }
}
