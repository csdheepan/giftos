import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShippingDetails } from 'src/app/core/model/product-model';
import { InMemoryCache } from 'src/app/shared/services/memory-cache';


@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss']
})
export class OrderPlacedComponent implements OnInit {

  shippingDetails !: ShippingDetails;

  constructor(
    private router: Router, 
    private store: InMemoryCache
  ) {}

  ngOnInit(): void {
    const shippingDetailsJson = this.store.getItem('SHIPPING_DETAILS');
    this.shippingDetails = JSON.parse(shippingDetailsJson);
  }

  navigateBack(): void {
    this.router.navigate(['user/full/products']);
    this.store.removeItem('SHIPPING_DETAILS');
  }
}
