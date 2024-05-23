import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environment/environment';
import { AngularFireModule} from '@angular/fire/compat'
import { GiftosComponent } from './giftos/giftos.component';
import { ProductsComponent } from './products/products.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { InMemoryCache } from './services/cache-services';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MfaComponent } from './mfa/mfa.component';
import { FullComponent } from './full/full.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { ProductDialogComponent } from './modal/product-dialog/product-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GiftosComponent,
    ProductsComponent,
    CartProductsComponent,
    OrderPlacedComponent,
    LoginComponent,
    MfaComponent,
    FullComponent,
    UserAccountComponent,
    UserOrdersComponent,
    ProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [InMemoryCache,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
