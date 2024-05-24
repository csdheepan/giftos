import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftosComponent } from './giftos/giftos.component';
import { ProductsComponent } from './products/products.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { LoginComponent } from './login/login.component';
import { MfaComponent } from './mfa/mfa.component';
import { FullComponent } from './full/full.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AuthGuard} from './guard/auth.guard'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartProductsComponent } from './cart-products/cart-products.component';

const routes: Routes = [
  {
    path: "",
    component: GiftosComponent
  },
  {
    path:"login",
    component : LoginComponent
  },
  {
    path:'mfa',
    component: MfaComponent
  },
  {
    path : "order-placed",
    component : OrderPlacedComponent
  },
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
      }
    ]
  },
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //the option scrollPositionRestoration can be top (every navigation change)
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
