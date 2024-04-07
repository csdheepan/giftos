import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftosComponent } from './giftos/giftos.component';
import { ProductsComponent } from './products/products.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';

const routes: Routes = [
  {
    path: "",
    component: GiftosComponent
  },
  {
    path:"products",
    component : ProductsComponent
  },
  {
    path:"home",
    component : GiftosComponent
  },
  {
    path:"cart",
    component : CartProductsComponent
  },
  {
    path : "order",
    component : OrderPlacedComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
