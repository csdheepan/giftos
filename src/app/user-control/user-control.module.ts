import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserControlRoutingModule } from './user-control-routing.module';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { FullComponent } from './full/full.component';
import { ProductDialogComponent } from './modal/product-dialog/product-dialog.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { ProductsComponent } from './products/products.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [
    CartProductsComponent,
    FullComponent,
    ProductDialogComponent,
    OrderPlacedComponent,
    ProductsComponent,
    UserAccountComponent,
    UserOrdersComponent
  ],
  imports: [
    CommonModule,
    UserControlRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class UserControlModule { }
