import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './full/full.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from '../core/guard/auth-guard';
import { GiftosComponent } from '../giftos/giftos.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';

const routes: Routes = [
  {
    path: 'full',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:"products",
        component : ProductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path:"home",
        component : GiftosComponent,
        canActivate: [AuthGuard],
      },
      {
        path:"cart",
        component : CartProductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path : "account",
        component: UserAccountComponent,
        canActivate: [AuthGuard],
      },
      {
        path : "orders",
        component: UserOrdersComponent,
        canActivate: [AuthGuard],
      },
       {
        path : "order-placed",
        component : OrderPlacedComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserControlRoutingModule { }
