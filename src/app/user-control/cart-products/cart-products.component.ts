import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUp } from 'src/app/core/model/login-model';
import { InMemoryCache } from 'src/app/shared/services/memory-cache';
import { CartProductService } from 'src/app/core/services/cart-product.service';
import { UserService } from 'src/app/core/services/user.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Product, ShippingDetails } from 'src/app/core/model/product-model';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit, OnDestroy {

  listProducts: Product[] = [];
  overallPrice!: string;
  discount!: string;
  tax!: string;
  totalCost!: string;
  form: FormGroup = Object.create(null);
  userDetail!: SignUp;
  subscriptions: Subscription[] = [];

  constructor(
    private store: InMemoryCache,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private cartProductService: CartProductService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserDetailsFromStorage();
    this.loadUserCartProducts();
    this.loadUserDetails();
  }

  private initForm(): void {
    this.form = this.fb.group({
      address: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      paymentMode: ['cash on delivery', Validators.required]
    });
  }

  private loadUserDetailsFromStorage(): void {
    this.userDetail = JSON.parse(this.store.getItem('USER_DETAILS'));
  }

  private loadUserCartProducts(): void {
    const cartProductSubscription = this.cartProductService.getCartProducts(this.userDetail.id).subscribe(
      data => {
        this.listProducts = data.length ? data[0].product : [];
        this.calculatePrice();
      },
      err => this.errorHandlerService.handleErrors(err, "Error retrieving user cart products")
    );
    this.subscriptions.push(cartProductSubscription);
  }

  private loadUserDetails(): void {
    const userDetailsSubscription = this.userService.getUserDetails(this.userDetail.id).subscribe(
      data => {
        if (data.length) {
          this.form.patchValue({
            address: data[0].street,
            city: data[0].city,
            country: data[0].country,
            phoneNumber: data[0].phone,
          });
        }
      },
      err => this.errorHandlerService.handleErrors(err, "Error retrieving user details")
    );
    this.subscriptions.push(userDetailsSubscription);
  }

  private calculatePrice(): void {
    if (this.listProducts.length) {
      const totalPrice = this.listProducts.reduce((acc, product) => acc + parseFloat(product.price.replace('$', '')), 0);
      this.overallPrice = totalPrice.toFixed(2);
      this.discount = (totalPrice * 0.1).toFixed(2);
      const totalCostBeforeTax = totalPrice - parseFloat(this.discount);
      const taxPercentage = 5;
      this.tax = ((totalCostBeforeTax * taxPercentage) / 100).toFixed(2);
      this.totalCost = (totalCostBeforeTax + parseFloat(this.tax)).toFixed(2);
    } else {
      this.resetPrice();
    }
  }

  private resetPrice(): void {
    this.overallPrice = "0";
    this.discount = "0";
    this.tax = "0";
    this.totalCost = "0";
  }

  removeProduct(product: any, index: number): void {
    this.listProducts.splice(index, 1);
    this.calculatePrice();
    this.cartProductService.addItem(this.listProducts, this.userDetail.id).subscribe(
      () => {},
      err => this.errorHandlerService.handleErrors(err, "updating product items")
    );
  }

  navigateToShop(): void {
    this.router.navigate(["user/full/products"]);
  }

  confirmOrder(): void {
    if (this.form.valid && this.listProducts.length) {
      const orderDetails:ShippingDetails = this.createOrderDetails();
      this.cartProductService.deleteCartItem(this.userDetail.id).subscribe(
        () => {
          this.cartProductService.placeOrder(orderDetails, this.userDetail.id).subscribe(
            () => {
              this.store.setItem("SHIPPING_DETAILS", JSON.stringify(orderDetails));
              this.router.navigate(["user/full/order-placed"]);
            },
            err => this.errorHandlerService.handleErrors(err, "while placing order")
          );
        },
        err => this.errorHandlerService.handleErrors(err, "while deleting cart items")
      );
    } else {
      this.showSnackBar("Please add products to the cart and fill all details");
    }
  }

  private createOrderDetails(): any {
    const todayDate = this.datePipe.transform(new Date(), 'dd/MM/YYYY');
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    const deliveryDate = new Date().setDate(new Date().getDate() + 7);
    const estDeliveryDate = this.datePipe.transform(deliveryDate, 'MMMM d, yyyy');
    return {
      orderId,
      purchaseDate: todayDate,
      totalCost: this.totalCost,
      orderAddress: this.form.value,
      productDetails: this.listProducts,
      estDeliveryDate,
    };
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

  toggleLike(product: any): void {
    product.likedProduct = !product.likedProduct;
    this.cartProductService.addItem(this.listProducts, this.userDetail.id).subscribe(
      () => {},
      err => this.errorHandlerService.handleErrors(err, "Error updating product items")
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
